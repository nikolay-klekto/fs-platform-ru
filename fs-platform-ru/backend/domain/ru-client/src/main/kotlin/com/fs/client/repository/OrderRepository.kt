package com.fs.client.repository

import com.fs.client.service.OrderModelConverter
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.domain.jooq.tables.records.OrderRecord
import com.fs.service.ru.OrderModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class OrderRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val clientRepository: ClientRepository
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