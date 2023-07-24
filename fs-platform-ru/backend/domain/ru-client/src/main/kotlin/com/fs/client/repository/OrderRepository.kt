package com.fs.client.repository

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.CountryBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.ru.enums.CurrencyModel
import com.fs.client.service.OrderModelConverter
import com.fs.client.service.TotalPriceMatcher
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.domain.jooq.tables.records.OrderRecord
import com.fs.service.ru.BasketModel
import com.fs.service.ru.OrderModel
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.util.*

abstract class OrderRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val basketRepository: BasketRepository,
    open val serviceBlockingRepository: ServiceBlockingRepository,
    open val cityRepository: CityRepository,
    open val countryBlockingRepository: CountryBlockingRepository,
    open val basketBlockingRepository: BasketBlockingRepository,
    open val totalPriceMatcher: TotalPriceMatcher,
    open val orderBlockingRepository: OrderBlockingRepository
) {

    fun getOrderByrId(id: Long): Mono<OrderModel> {
        return Mono.fromSupplier {
            orderBlockingRepository.getById(id)
        }
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
                    basketBlockingRepository.getById(orderModel.basketId!!)?.totalPrice
                if (pastTotalPrice != null) {

                    val servicePrice: Long =
                        serviceBlockingRepository.getById(orderModel.serviceId!!)
                            ?.pricePerDay!! * orderModel.totalWorkDays!!

                    val orderCity = cityRepository.getCityByOfficeId(orderModel.companyOfficeId!!)

                    val orderCurrency: CurrencyModel =
                        countryBlockingRepository.getCountryByCityId(orderCity.id)?.currency!!

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
            val oldOrderModel: OrderModel = orderBlockingRepository.getById(newOrderModel.id)!!

            dsl.update(ORDER)
                .set(ORDER.START_WORK_DATE, newOrderModel.startWorkDate ?: oldOrderModel.startWorkDate)
                .set(ORDER.TOTAL_WORK_DAYS, newOrderModel.totalWorkDays ?: oldOrderModel.totalWorkDays)
                .where(ORDER.ID.eq(newOrderModel.id))
                .execute() == 1
        }
    }

    fun updateExpiredStatus() {
        log.info("Scheduler is working. The time is now {}", dateFormat.format(Date()))
        dsl.update(ORDER)
            .set(ORDER.IS_EXPIRED, false)
            .where(
                ORDER.IS_EXPIRED.eq(true).and(
                    ORDER.START_WORK_DATE.plus(ORDER.TOTAL_WORK_DAYS).ge(LocalDateTime.now())
                )
            )

    }

    companion object {
        private val log = LogManager.getLogger()
        private val dateFormat = SimpleDateFormat("HH:mm:ss")
    }
}