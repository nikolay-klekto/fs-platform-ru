package com.fs.client.repository.blocked

import com.fs.client.converter.OrderModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.domain.jooq.tables.Client
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.domain.jooq.tables.records.OrderRecord
import com.fs.service.ru.BasketModel
import com.fs.service.ru.OrderModel
import com.fs.service.ru.OrderModelInput
import com.fs.service.ru.enums.OrderStatus
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDateTime

abstract class OrderBlockingRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository,
    open val companyProfessionBlockingRepository: CompanyProfessionBlockingRepository
) {

    suspend fun getById(orderId: Long): OrderModel? = withContext(Dispatchers.IO) {
        dsl.select(ORDER.asterisk())
            .from(ORDER)
            .where(ORDER.ID.eq(orderId))
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    suspend fun getAllByClientId(clientId: String): List<OrderModel> = withContext(Dispatchers.IO) {
        dsl.selectFrom(ORDER)
            .where(
                ORDER.BASKET_ID.eq(
                    dsl.select(Client.CLIENT.BASKET_ID)
                        .from(Client.CLIENT)
                        .where(Client.CLIENT.ID.eq(clientId))
                )
            )
                    .map { it.into(Order::class.java) }
                    .map(converter::toModel)
    }

    suspend fun decreaseBasketTotalPriceByOrderId(orderId: Long) = withContext(Dispatchers.IO) {
        val currentOrder: OrderModel? = getById(orderId)
        val orderStatus = currentOrder?.orderStatus
        if (orderStatus == OrderStatus.BASKET ||
            orderStatus == OrderStatus.PRE_ORDERED ||
            orderStatus == OrderStatus.ACTUAL
        ) {
            val basketTotalPrice: Double? = dsl.select(BASKET.TOTAL_PRICE)
                .from(BASKET)
                .where(BASKET.ID.eq(dsl.select(ORDER.BASKET_ID).from(ORDER).where(ORDER.ID.eq(orderId))))
                .map { it.into(Double::class.java) }
                .firstOrNull()

            val currentOrderPrice = currentOrder.price

            val totalBasketPrice = basketTotalPrice!! - currentOrderPrice!!

            basketBlockingRepository.update(BasketModel(currentOrder.basketId!!, totalBasketPrice))
        }
    }

    suspend fun isBasketEmpty(basketId: Long): Boolean = withContext(Dispatchers.IO) {
        val ordersWithCurrentBasket: Int = dsl.selectCount()
            .from(ORDER)
            .where(ORDER.BASKET_ID.eq(basketId))
            .first()
            .map { it.into(Int::class.java) }
        ordersWithCurrentBasket == 0
    }

    suspend fun deleteFinalById(orderId: Long): Boolean = withContext(Dispatchers.IO) {
        decreaseBasketTotalPriceByOrderId(orderId)
        dsl.deleteFrom(ORDER)
            .where(ORDER.ID.eq(orderId))
            .execute() == 1
    }

    suspend fun insert(orderModel: OrderModelInput): OrderModel = withContext(Dispatchers.IO) {
        if (orderModel.companyProfessionId == null || orderModel.companyOfficeId == null ||
            orderModel.startWorkDate == null || orderModel.totalWorkDays == null
        ) {
            throw Exception("Необходимо заполнить все обязательные поля!")
        }

        var newOrderStatus: OrderStatus? = OrderStatus.BASKET
        var basketId: Long? = orderModel.basketId

        if (orderModel.basketId == null) {
            val newBasketModel: BasketModel = basketBlockingRepository.insert()
            basketId = newBasketModel.id
        } else {
            newOrderStatus = if (orderModel.startWorkDate!!.plusDays(orderModel.totalWorkDays!!)
                    .isBefore(LocalDateTime.now())
            ) {
                OrderStatus.EXPIRED
            } else {
                OrderStatus.BASKET
            }
        }

        val pastTotalPrice: Double? = basketBlockingRepository.getById(basketId!!)?.totalPrice

        val newOrderPrice: Double = companyProfessionBlockingRepository
            .getPricePerDayById(orderModel.companyProfessionId!!) * orderModel.totalWorkDays!!

        val totalPrice: Double = pastTotalPrice?.let { it + newOrderPrice } ?: newOrderPrice

        basketBlockingRepository.update(BasketModel(basketId, totalPrice))

        val newOrderModel = OrderModel(
            id = DEFAULT_ORDER_ID,
            basketId = basketId,
            companyOfficeId = orderModel.companyOfficeId,
            dateCreated = LocalDateTime.now(),
            isExpired = orderModel.isExpired,
            orderStatus = orderModel.orderStatus ?: newOrderStatus,
            startWorkDate = orderModel.startWorkDate,
            totalWorkDays = orderModel.totalWorkDays,
            price = newOrderPrice,
            companyProfessionId = orderModel.companyProfessionId!!,
            contractNumber = orderModel.contractNumber,
            orderDatesId = orderModel.orderDatesId
        )

        val newOrderRecord: OrderRecord = dsl.newRecord(ORDER)
        newOrderRecord.from(newOrderModel)
        newOrderRecord.reset(ORDER.ID)
        newOrderRecord.store()
        converter.toModel(newOrderRecord.into(Order::class.java))
    }

    suspend fun insertFromUpdate(orderModel: OrderModel): OrderModel = withContext(Dispatchers.IO) {
        if (orderModel.companyProfessionId == null || orderModel.companyOfficeId == null ||
            orderModel.startWorkDate == null || orderModel.totalWorkDays == null
        ) {
            throw Exception("Необходимо заполнить все обязательные поля!")
        }

        var newOrderStatus: OrderStatus? = OrderStatus.BASKET
        var basketId: Long? = orderModel.basketId

        if (orderModel.basketId == null) {
            val newBasketModel: BasketModel = basketBlockingRepository.insert()
            basketId = newBasketModel.id
        } else {
            newOrderStatus = if (orderModel.startWorkDate!!.plusDays(orderModel.totalWorkDays!!)
                    .isBefore(LocalDateTime.now())
            ) {
                OrderStatus.EXPIRED
            } else {
                OrderStatus.BASKET
            }
        }

        val pastTotalPrice: Double? = basketBlockingRepository.getById(basketId!!)?.totalPrice

        val newOrderPrice: Double = companyProfessionBlockingRepository
            .getPricePerDayById(orderModel.companyProfessionId!!) * orderModel.totalWorkDays!!

        val totalPrice: Double = pastTotalPrice?.let { it + newOrderPrice } ?: newOrderPrice

        basketBlockingRepository.update(BasketModel(basketId, totalPrice))

        val newOrderModel = OrderModel(
            id = DEFAULT_ORDER_ID,
            basketId = basketId,
            companyOfficeId = orderModel.companyOfficeId,
            dateCreated = LocalDateTime.now(),
            isExpired = orderModel.isExpired,
            orderStatus = orderModel.orderStatus ?: newOrderStatus,
            startWorkDate = orderModel.startWorkDate,
            totalWorkDays = orderModel.totalWorkDays,
            price = newOrderPrice,
            companyProfessionId = orderModel.companyProfessionId,
            contractNumber = orderModel.contractNumber,
            orderDatesId = orderModel.orderDatesId
        )

        val newOrderRecord: OrderRecord = dsl.newRecord(ORDER)
        newOrderRecord.from(newOrderModel)
        newOrderRecord.reset(ORDER.ID)
        newOrderRecord.store()
        converter.toModel(newOrderRecord.into(Order::class.java))
    }

    suspend fun checkAndUpdateOrderStatus(orderId: Long) = withContext(Dispatchers.IO) {
        val newOrderStatus: OrderStatus

        val oldOrderModel = getById(orderId)
        newOrderStatus =
            if (oldOrderModel?.orderStatus != null && oldOrderModel.orderStatus == OrderStatus.BASKET) {
                OrderStatus.BASKET
            } else {
                if (oldOrderModel?.startWorkDate!!.plusDays(oldOrderModel.totalWorkDays!!)
                        .isBefore(LocalDateTime.now())
                ) {
                    OrderStatus.EXPIRED
                } else {
                    OrderStatus.BASKET
                }
            }

        dsl.update(ORDER)
            .set(ORDER.ORDER_STATUS, newOrderStatus.name)
            .where(ORDER.ID.eq(orderId))
            .execute()
    }

    suspend fun updateOrder(newOrderModel: OrderModel): Boolean = withContext(Dispatchers.IO) {
        val oldOrderModel: OrderModel = getById(newOrderModel.id!!)!!

        dsl.update(ORDER)
            .set(ORDER.ORDER_STATUS, newOrderModel.orderStatus?.name ?: oldOrderModel.orderStatus?.name)
            .where(ORDER.ID.eq(newOrderModel.id))
            .execute() == 1
    }

    suspend fun updateOrderStatus(orderId: Long, orderStatus: OrderStatus): Boolean = withContext(Dispatchers.IO) {
        decreaseBasketTotalPriceByOrderId(orderId)
        dsl.update(ORDER)
            .set(ORDER.ORDER_STATUS, orderStatus.name)
            .where(ORDER.ID.eq(orderId))
            .execute() == 1
    }

    companion object {
        private const val DEFAULT_ORDER_ID: Long = 1
    }
}