package com.fs.client.repository

import com.fs.client.converter.OrderModelConverter
import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.CompanyProfessionBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ProfessionBlockingRepository
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.service.ru.OrderModel
import com.fs.service.ru.enums.OrderStatus
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.util.*

abstract class OrderRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository,
    open val orderBlockingRepository: OrderBlockingRepository,
    open val professionBlockingRepository: ProfessionBlockingRepository,
    open val companyProfessionBlockingRepository: CompanyProfessionBlockingRepository
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

    fun getAllOrdersByClientId(clientId: String): Flux<OrderModel> {
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
                .set(ORDER.ORDER_STATUS, newOrderModel.orderStatus?.name ?: oldOrderModel.orderStatus?.name)
//                .set(ORDER.START_WORK_DATE, newOrderModel.startWorkDate ?: oldOrderModel.startWorkDate)
//                .set(ORDER.TOTAL_WORK_DAYS, newOrderModel.totalWorkDays ?: oldOrderModel.totalWorkDays)
                .where(ORDER.ID.eq(newOrderModel.id))
                .execute() == 1

//            orderBlockingRepository.checkAndUpdateOrderStatus(newOrderModel.id!!)
            return@fromSupplier result
        }
    }

    fun updateExpiredStatus() {
        log.info("Scheduler is working. The time is now {}", dateFormat.format(Date()))

        // Выбираем истекшие заказы
        val expiredOrdersList: List<OrderModel> = dsl.selectFrom(ORDER).where(
            ORDER.ORDER_STATUS.eq(OrderStatus.ACTUAL.name).and(
                ORDER.START_WORK_DATE.le(
                    DSL.currentLocalDateTime().minus(
                        DSL.cast(ORDER.TOTAL_WORK_DAYS, SQLDataType.INTEGER)
                            .mul(DSL.field("INTERVAL '1 day'", SQLDataType.INTERVAL))
                    )
                )
            )
        ).map { it.into(OrderModel::class.java) }

        expiredOrdersList.forEach { order ->
            orderBlockingRepository.decreaseBasketTotalPriceByOrderId(order.id!!)
            val professionId = companyProfessionBlockingRepository.getProfessionIdById(order.companyProfessionId!!)
            professionBlockingRepository.increaseClientsNumberByProfessionId(professionId)
        }

        // Обновляем статус заказов
        dsl.update(ORDER)
            .set(ORDER.ORDER_STATUS, OrderStatus.EXPIRED.name)
            .where(
                ORDER.ORDER_STATUS.eq(OrderStatus.ACTUAL.name).and(
                    ORDER.START_WORK_DATE.le(
                        DSL.currentLocalDateTime().minus(
                            DSL.cast(ORDER.TOTAL_WORK_DAYS, SQLDataType.INTEGER)
                                .mul(DSL.field("INTERVAL '1 day'", SQLDataType.INTERVAL))
                        )
                    )
                )
            )

        // Временные заказы
        val temporaryExpiredOrders: List<OrderModel> =
            dsl.select(ORDER.asterisk()).from(ORDER)
                .where(
                    ORDER.ORDER_STATUS.eq(OrderStatus.PRE_ORDERED.name)
                        .or(ORDER.ORDER_STATUS.eq(OrderStatus.BASKET.name))
                        .and(
                            ORDER.DATE_CREATED.le(
                                DSL.currentLocalDateTime().minus(
                                    DSL.field("INTERVAL '1 day'", SQLDataType.INTERVAL)
                                        .mul(DSL.cast(TEMPORARY_ORDER_LIFE_TIME, SQLDataType.INTEGER))
                                )
                            )
                        )
                )
                .map { it.into(OrderModel::class.java) }

        temporaryExpiredOrders.forEach { orderModel ->
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

    fun deleteAllOrdersByBasketId(basketId: Long, orderStatus: OrderStatus): Mono<Boolean> {
        return Mono.fromSupplier {
            val orderList = dsl.select(ORDER.ID).from(ORDER)
                .where(
                ORDER.BASKET_ID.eq(basketId)
                    .and(ORDER.ORDER_STATUS.eq(orderStatus.name))
            ).map { it.into(Long::class.java) }
            var result = false
            orderList.forEach { orderId ->
                if(orderBlockingRepository.deleteById(orderId)){
                    result = true
                }
            }
            return@fromSupplier result
        }
    }

    fun deleteAllOrdersByClientId(clientId: String, orderStatus: OrderStatus): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(ORDER)
                .where(
                    ORDER.BASKET_ID.eq(
                        dsl.select(CLIENT.BASKET_ID).from(CLIENT)
                            .where(
                                CLIENT.ID.eq(clientId)
                                .and(ORDER.ORDER_STATUS.eq(orderStatus.name)))
                    )
                ).execute() >=0

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