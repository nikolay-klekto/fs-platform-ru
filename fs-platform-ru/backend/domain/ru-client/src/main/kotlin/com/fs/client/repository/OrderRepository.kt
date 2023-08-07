package com.fs.client.repository

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.service.OrderModelConverter
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.domain.jooq.tables.records.OrderRecord
import com.fs.service.ru.BasketModel
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
    open val serviceBlockingRepository: ServiceBlockingRepository,
    open val basketBlockingRepository: BasketBlockingRepository,
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
            if (orderModel.serviceId == null || orderModel.companyOfficeId == null ||
                orderModel.startWorkDate == null || orderModel.totalWorkDays == null
            ) {
                throw Exception("Необходимо заполнить все обязательные поля!")
            }

            val newOrderStatus: OrderStatus
            var basketId: Long? = orderModel.basketId
            var isBasketTemporary = false

            if (orderModel.basketId != null) {
                isBasketTemporary = orderBlockingRepository.isPreOrdersInBasket(orderModel.basketId!!)
            }

            if (orderModel.basketId == null || isBasketTemporary) {
                newOrderStatus = OrderStatus.PRE_ORDERED
                val newBasketModel: BasketModel = basketBlockingRepository.insert()
                basketId = newBasketModel.id
            } else {

                newOrderStatus = if (orderModel.startWorkDate!!.plusDays(orderModel.totalWorkDays!!)
                        .isAfter(LocalDateTime.now())
                ) {
                    OrderStatus.EXPIRED
                } else {
                    OrderStatus.ACTUAL
                }
            }

            val pastTotalPrice: Double? =
                basketBlockingRepository.getById(orderModel.basketId!!)?.totalPrice

            val servicePrice: Double =
                serviceBlockingRepository.getById(orderModel.serviceId!!)
                    ?.pricePerDay!!.toDouble() * orderModel.totalWorkDays!!

            val totalPrice: Double = if (pastTotalPrice != null) {

                pastTotalPrice + servicePrice

            } else {
                servicePrice
            }
            basketBlockingRepository.update(BasketModel(orderModel.basketId!!, totalPrice))

            val newOrderModel = OrderModel(
                DEFAULT_ORDER_ID,
                basketId,
                orderModel.companyOfficeId,
                LocalDateTime.now(),
                orderModel.positionId,
                orderModel.serviceId,
                newOrderStatus,
                orderModel.startWorkDate,
                orderModel.totalWorkDays,
                orderModel.price
            )
            val newOrderRecord: OrderRecord = dsl.newRecord(ORDER)
            newOrderRecord.from(newOrderModel)
            newOrderRecord.reset(ORDER.ID)
            newOrderRecord.store()
            return@fromSupplier newOrderRecord.into(Order::class.java)
        }
            .map(converter::toModel)
    }

    fun updateOrder(newOrderModel: OrderModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldOrderModel: OrderModel = orderBlockingRepository.getById(newOrderModel.id!!)!!

            dsl.update(ORDER)
                .set(ORDER.START_WORK_DATE, newOrderModel.startWorkDate ?: oldOrderModel.startWorkDate)
                .set(ORDER.TOTAL_WORK_DAYS, newOrderModel.totalWorkDays ?: oldOrderModel.totalWorkDays)
                .where(ORDER.ID.eq(newOrderModel.id))
                .execute() == 1
        }
    }

    fun updateExpiredStatus() {
        log.info("Scheduler is working. The time is now {}", dateFormat.format(Date()))
        val expiredOrdersList: List<Long> = dsl.select(ORDER.ID).from(ORDER).where(
            ORDER.ORDER_STATUS.eq(OrderStatus.ACTUAL).and(
                ORDER.START_WORK_DATE.plus(ORDER.TOTAL_WORK_DAYS).ge(LocalDateTime.now())
            )
        ).map { it.into(Long::class.java) }

        expiredOrdersList.stream().map { orderId ->
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
            orderBlockingRepository.decreaseBasketTotalPriceByOrderId(orderId)

            return@fromSupplier dsl.deleteFrom(ORDER)
                .where(ORDER.ID.eq(orderId))
                .execute() == 1
        }
    }

    fun copyAllOrdersToMainBasket(temporaryBasketId: Long, activeBasketId: Long) {
        val allTemporaryOrders: List<OrderModel> =
            dsl.select(ORDER.asterisk()).from(ORDER)
                .where(ORDER.BASKET_ID.eq(temporaryBasketId))
                .map { it.into(OrderModel::class.java) }


        allTemporaryOrders.stream().map { temporaryOrder ->
            val updatableOrderModel = OrderModel(
                temporaryOrder.id,
                activeBasketId,
                temporaryOrder.companyOfficeId,
                temporaryOrder.dateCreated,
                temporaryOrder.positionId,
                temporaryOrder.serviceId,
                temporaryOrder.orderStatus,
                temporaryOrder.startWorkDate,
                temporaryOrder.totalWorkDays,
                temporaryOrder.price
            )
            insertOrder(updatableOrderModel)
            deleteOrderById(temporaryOrder.id!!)
            if (orderBlockingRepository.isBasketEmpty(temporaryBasketId)) {
                basketBlockingRepository.delete(temporaryBasketId)
            }
        }
    }

    companion object {
        private val log = LogManager.getLogger()
        private val dateFormat = SimpleDateFormat("HH:mm:ss")
        private const val TEMPORARY_ORDER_LIFE_TIME: Int = 2
        private const val DEFAULT_ORDER_ID: Long = 1
    }
}