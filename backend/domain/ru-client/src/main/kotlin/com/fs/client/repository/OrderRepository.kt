package com.fs.client.repository

import com.fs.client.converter.OrderModelConverter
import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.service.ru.OrderModel
import com.fs.service.ru.enums.OrderStatus
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
    open val basketBlockingRepository: BasketBlockingRepository,
    open val orderBlockingRepository: OrderBlockingRepository
) {

    fun getAllOrders(): Flux<OrderModel> {
        return Flux.from(
            dsl.select(ORDER.asterisk()).from(ORDER)
        )
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun getOrderByrId(id: Long): Mono<OrderModel> {
        return Mono.fromSupplier {
            orderBlockingRepository.getById(id)
        }
    }

    fun getAllOrdersByClientId(clientId: Long): Flux<OrderModel> {
        return Flux.fromIterable(
            orderBlockingRepository.getAllByClientId(clientId)
        )
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
            orderBlockingRepository.insert(orderModel)
        }
    }

    fun updateOrder(newOrderModel: OrderModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldOrderModel: OrderModel = orderBlockingRepository.getById(newOrderModel.id!!)!!

            val result = dsl.update(ORDER)
                .set(ORDER.START_WORK_DATE, newOrderModel.startWorkDate ?: oldOrderModel.startWorkDate)
                .set(ORDER.TOTAL_WORK_DAYS, newOrderModel.totalWorkDays ?: oldOrderModel.totalWorkDays)
                .where(ORDER.ID.eq(newOrderModel.id))
                .execute() == 1

            orderBlockingRepository.checkAndUpdateOrderStatus(newOrderModel.id!!)
            return@fromSupplier result
        }
    }

    fun updateExpiredStatus() {
        log.info("Scheduler is working. The time is now {}", dateFormat.format(Date()))
        val expiredOrdersList: List<Long> = dsl.select(ORDER.ID).from(ORDER).where(
            ORDER.ORDER_STATUS.eq(OrderStatus.ACTUAL).and(
                ORDER.START_WORK_DATE.plus(ORDER.TOTAL_WORK_DAYS).ge(LocalDateTime.now())
            )
        ).map { it.into(Long::class.java) }

        expiredOrdersList.forEach { orderId ->
            orderBlockingRepository.decreaseBasketTotalPriceByOrderId(orderId)
        }
        dsl.update(ORDER)
            .set(ORDER.ORDER_STATUS, OrderStatus.EXPIRED)
            .where(
                ORDER.ORDER_STATUS.eq(OrderStatus.ACTUAL).and(
                    ORDER.START_WORK_DATE.plus(ORDER.TOTAL_WORK_DAYS).ge(LocalDateTime.now())
                )
            )

        val temporaryExpiredOrders: List<OrderModel> =
            dsl.select(ORDER.asterisk()).from(ORDER)
                .where(
                    ORDER.ORDER_STATUS.eq(OrderStatus.PRE_ORDERED)
                        .and(ORDER.DATE_CREATED.plus(TEMPORARY_ORDER_LIFE_TIME).ge(LocalDateTime.now()))
                )
                .map { it.into(OrderModel::class.java) }

        temporaryExpiredOrders.stream().map { orderModel ->
            deleteOrderById(orderModel.id!!)
            if (orderBlockingRepository.isBasketEmpty(orderModel.basketId!!)) {
                basketBlockingRepository.delete(orderModel.basketId!!)
            }
        }
    }

    fun deleteOrderById(orderId: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            orderBlockingRepository.deleteById(orderId)
        }
    }

    fun deleteAllOrdersByBasketId(basketId: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(ORDER).where(ORDER.BASKET_ID.eq(basketId))
                .execute() > 0
        }
    }

    fun copyAllOrdersToMainBasket(temporaryBasketId: Long, activeBasketId: Long) {
        val allTemporaryOrders: List<OrderModel> =
            dsl.select(ORDER.asterisk()).from(ORDER)
                .where(ORDER.BASKET_ID.eq(temporaryBasketId))
                .map { it.into(OrderModel::class.java) }


        allTemporaryOrders.forEach { temporaryOrder ->
            val updatableOrderModel = OrderModel(
                id = temporaryOrder.id,
                basketId = activeBasketId,
                companyOfficeId = temporaryOrder.companyOfficeId,
                dateCreated = temporaryOrder.dateCreated,
                isExpired = temporaryOrder.isExpired,
                orderStatus = temporaryOrder.orderStatus,
                startWorkDate = temporaryOrder.startWorkDate,
                totalWorkDays = temporaryOrder.totalWorkDays,
                price = temporaryOrder.price,
                companyProfessionId = temporaryOrder.companyProfessionId
            )
            orderBlockingRepository.insert(updatableOrderModel)
            orderBlockingRepository.deleteById(temporaryOrder.id!!)
            if (orderBlockingRepository.isBasketEmpty(temporaryBasketId)) {
                basketBlockingRepository.delete(temporaryBasketId)
            }
        }
    }

    companion object {
        private val log = LogManager.getLogger(OrderRepository::class.java)
        private val dateFormat = SimpleDateFormat("HH:mm:ss")
        private const val TEMPORARY_ORDER_LIFE_TIME: Int = 2
        private const val DEFAULT_ORDER_ID: Long = 1
    }
}