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
import com.fs.service.ru.OrderModelInput
import com.fs.service.ru.enums.OrderStatus
import com.fs.service.ru.errors.ErrorModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType
import reactor.core.publisher.Flux
import reactor.core.scheduler.Schedulers
import java.text.SimpleDateFormat
import java.util.*

abstract class OrderRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository,
    open val orderBlockingRepository: OrderBlockingRepository,
    open val professionBlockingRepository: ProfessionBlockingRepository,
    open val companyProfessionBlockingRepository: CompanyProfessionBlockingRepository,
    open val orderDatesRepository: OrdersDatesRepository
) {

    suspend fun getAllOrders(): List<OrderModel> = withContext(Dispatchers.IO) {
        dsl.select(ORDER.asterisk())
            .from(ORDER)
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    suspend fun getOrderById(id: Long): OrderModel? = withContext(Dispatchers.IO) {
        orderBlockingRepository.getById(id)
    }

    suspend fun getAllOrdersByClientId(clientId: String): List<OrderModel> = withContext(Dispatchers.IO) {
        orderBlockingRepository.getAllByClientId(clientId)
    }

    suspend fun getAllOrdersByBasketID(basketId: Long): List<OrderModel> = withContext(Dispatchers.IO) {
        dsl.selectFrom(ORDER)
            .where(ORDER.BASKET_ID.eq(basketId))
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun getAllOrdersByBasketIDSimple(basketId: Long): List<OrderModel> {
        return dsl.selectFrom(ORDER)
            .where(ORDER.BASKET_ID.eq(basketId))
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun getAllOrdersByBasketIDWebFlux(basketId: Long): Flux<OrderModel> {
        return Flux.from(
            dsl.selectFrom(ORDER)
                .where(ORDER.BASKET_ID.eq(basketId))
        ).map { it.into(Order::class.java) }
            .map(converter::toModel)
    }

    fun getAllOrdersByBasketIDWebFluxPlus(basketId: Long): Flux<OrderModel> {
        return Flux.defer {
            // Блокирующий вызов оборачиваем в Flux.defer
            Flux.fromIterable(
                dsl.selectFrom(ORDER)
                    .where(ORDER.BASKET_ID.eq(basketId))
                    .fetch() // Блокирующий вызов
                    .map { it.into(Order::class.java) }
                    .map(converter::toModel)
            )
        }
            .subscribeOn(Schedulers.boundedElastic()) // Выполняем на отдельном потоке
    }

    suspend fun insertOrder(orderModel: OrderModelInput): OrderModel = withContext(Dispatchers.IO) {
        orderBlockingRepository.insert(orderModel)
    }

    suspend fun updateOrder(newOrderModel: OrderModel): Boolean = withContext(Dispatchers.IO) {
        orderBlockingRepository.updateOrder(newOrderModel)
    }

    suspend fun confirmOrder(orderId: Long): ErrorModel<Boolean> = withContext(Dispatchers.IO) {
        val oldOrderModel = orderBlockingRepository.getById(orderId)
        orderDatesRepository.decreaseFreePlacesByOrderDatesId(oldOrderModel?.orderDatesId!!)
        if (oldOrderModel.orderStatus == OrderStatus.BASKET) {
            ErrorModel(
                orderBlockingRepository.updateOrderStatus(
                    orderId,
                    OrderStatus.NEED_TO_APPROVE_FROM_BASKET
                ), null
            )
        } else {
            ErrorModel(false, null)
        }
    }

    suspend fun changeOrderStatusAfterPay(orderId: Long, isPaySuccess: Boolean): Boolean = withContext(Dispatchers.IO) {
        val oldOrderModel = orderBlockingRepository.getById(orderId)
        val orderStatus = oldOrderModel!!.orderStatus
        if (orderStatus == OrderStatus.PRE_ORDERED || orderStatus == OrderStatus.PRE_ORDERED_DECLINED) {
            if (isPaySuccess) {
                orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.ACTUAL)
            } else {
                orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.PRE_ORDERED_DECLINED)
            }
        } else {
            false
        }
    }

    suspend fun updateOrderContractNumber(orderModel: OrderModel): Boolean = withContext(Dispatchers.IO) {
        dsl.update(ORDER)
            .set(ORDER.CONTRACT_NUMBER, orderModel.contractNumber)
            .where(ORDER.ID.eq(orderModel.id))
            .execute() == 1
    }

    suspend fun updateExpiredStatus() = withContext(Dispatchers.IO) {
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
                    deleteFinalOrderById(orderModel.id!!)
                    if (orderBlockingRepository.isBasketEmpty(orderModel.basketId!!)) {
                        basketBlockingRepository.delete(orderModel.basketId!!)
                    }
                }
    }

    suspend fun deleteFinalOrderById(orderId: Long): Boolean = withContext(Dispatchers.IO) {
        orderBlockingRepository.deleteFinalById(orderId)
    }

    suspend fun deleteOrderById(orderId: Long, orderStatus: OrderStatus): Boolean = withContext(Dispatchers.IO) {
        when (orderStatus) {
            OrderStatus.BASKET -> {
                orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.DELETED_FROM_BASKET)
            }
            OrderStatus.PRE_ORDERED -> {
                orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.TERMINATE_CONTRACT)
            }
            OrderStatus.ACTUAL -> {
                orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.ALARM_TERMINATE_CURRENT_ORDER)
            }
            else -> false
        }
    }

    suspend fun deleteAllOrdersByBasketId(basketId: Long, orderStatus: OrderStatus): Boolean = withContext(Dispatchers.IO) {
        val orderList = dsl.select(ORDER.ID).from(ORDER)
            .where(
                ORDER.BASKET_ID.eq(basketId)
                    .and(ORDER.ORDER_STATUS.eq(orderStatus.name))
            )
                    .map { it.into(Long::class.java) }
                var result = false
        orderList.forEach { orderId ->
            if (orderStatus == OrderStatus.BASKET) {
                if (orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.DELETED_FROM_BASKET)) {
                    result = true
                }
            } else if (orderStatus == OrderStatus.PRE_ORDERED) {
                if (orderBlockingRepository.updateOrderStatus(orderId, OrderStatus.TERMINATE_CONTRACT)) {
                    result = true
                }
            } else {
                result = false
            }
        }
        result
    }

    suspend fun deleteAllOrdersByClientId(clientId: String, orderStatus: OrderStatus): Boolean = withContext(Dispatchers.IO) {
        dsl.deleteFrom(ORDER)
            .where(
                ORDER.BASKET_ID.eq(
                    dsl.select(CLIENT.BASKET_ID).from(CLIENT)
                        .where(
                            CLIENT.ID.eq(clientId)
                                .and(ORDER.ORDER_STATUS.eq(orderStatus.name)))
                )
            ).execute() >= 0
    }

    suspend fun copyAllOrdersToMainBasket(temporaryBasketId: Long, activeBasketId: Long) = withContext(Dispatchers.IO) {
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
                companyProfessionId = temporaryOrder.companyProfessionId,
                contractNumber = temporaryOrder.contractNumber,
                orderDatesId = temporaryOrder.orderDatesId
            )
            orderBlockingRepository.insertFromUpdate(updatableOrderModel)
            orderBlockingRepository.deleteFinalById(temporaryOrder.id!!)
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