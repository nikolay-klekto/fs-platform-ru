package com.fs.client.repository

import com.fs.client.ru.enums.CurrencyModel
import com.fs.client.service.OrderModelConverter
import com.fs.client.service.TotalPriceMatcher
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.domain.jooq.tables.records.OrderRecord
import com.fs.service.ru.BasketModel
import com.fs.service.ru.OrderModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class OrderRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val basketRepository: BasketRepository,
    open val serviceRepository: ServiceRepository,
    open val cityRepository: CityRepository,
    open val totalPriceMatcher: TotalPriceMatcher
) {

    fun getByOrderId(id: Long): Mono<OrderModel> {
        return Mono.from(
            dsl.select(ORDER.asterisk()).from(ORDER)
                .where(ORDER.ID.eq(id))
        )
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun getAllOrdersByClientId(clientId: Long): Flux<OrderModel> {
        return Flux.from(
            dsl.selectFrom(ORDER)
                .where(
                    ORDER.BASKET_ID.eq(
                        dsl.select(CLIENT.BASKET_ID).from(CLIENT)
                            .where(CLIENT.ID.eq(clientId))
                    )
                )
        ).map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun getAllOrdersByBasketID(basketId: Long): Flux<OrderModel> {
        return Flux.from(
            dsl.selectFrom(ORDER)
                .where(ORDER.BASKET_ID.eq(basketId))
        ).map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun insertOrder(orderModel: OrderModel): Mono<OrderModel> {
        return Mono.fromSupplier {
            val totalPrice: String
            if (orderModel.basketId != null && orderModel.serviceId != null && orderModel.companyOfficeId != null) {
                val pastTotalPrice: String? =
                    basketRepository.getById(orderModel.basketId!!).block()!!.totalPrice
                if (pastTotalPrice != null) {

                    val servicePrice: Long =
                        serviceRepository.getById(orderModel.serviceId!!)
                            .block()!!.pricePerDay!! * orderModel.totalWorkDays!!

                    val orderCity = cityRepository.getCityByOfficeId(orderModel.companyOfficeId!!)

                    val orderCurrency: CurrencyModel =
                        cityRepository.getCountryByCityId(orderCity.id).block()!!.currency

                    val map: Map<CurrencyModel?, Long> = totalPriceMatcher.decomposeTotalPrice(pastTotalPrice)
                    val oldTotalPrice = map[orderCurrency]
                    if (oldTotalPrice != null) {
                        val newTotalPrice = oldTotalPrice + servicePrice
                        totalPrice = "$newTotalPrice $orderCurrency"
                        basketRepository.updateWithoutMono(BasketModel(orderModel.basketId!!, totalPrice))
                    }
                }

            }

            val newOrderRecord: OrderRecord = dsl.newRecord(ORDER)
            newOrderRecord.from(orderModel)
            newOrderRecord.reset(ORDER.ID)
            newOrderRecord.store()
            return@fromSupplier newOrderRecord.into(Order::class.java)
        }
            .map(converter::toModel)
    }

    fun updateOrder(newOrderModel: OrderModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldOrderModel: OrderModel = getByOrderId(newOrderModel.id).block()!!

            dsl.update(ORDER)
                .set(ORDER.START_WORK_DATE, newOrderModel.startWorkDate ?: oldOrderModel.startWorkDate)
                .set(ORDER.TOTAL_WORK_DAYS, newOrderModel.totalWorkDays ?: oldOrderModel.totalWorkDays)
                .where(ORDER.ID.eq(newOrderModel.id))
                .execute() == 1
        }
    }
}