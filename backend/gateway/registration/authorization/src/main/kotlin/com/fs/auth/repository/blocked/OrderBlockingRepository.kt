package com.fs.auth.repository.blocked

import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.domain.jooq.tables.Basket
import com.fs.domain.jooq.tables.Order
import com.fs.domain.jooq.tables.records.OrderRecord
import com.fs.service.ru.BasketModel
import com.fs.service.ru.OrderModel
import com.fs.service.ru.enums.OrderStatus
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

abstract class OrderBlockingRepository(
    open val dsl: DSLContext,
    open val basketBlockingRepository: BasketBlockingRepository,
    open val companyProfessionBlockingRepository: CompanyProfessionBlockingRepository
) {

    fun copyAllOrdersToMainBasket(temporaryBasketId: Long, activeBasketId: Long) {
        val allTemporaryOrders: List<OrderModel> =
            dsl.select(Order.ORDER.asterisk()).from(Order.ORDER)
                .where(Order.ORDER.BASKET_ID.eq(temporaryBasketId))
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
            insert(updatableOrderModel)
            deleteById(temporaryOrder.id!!)
            if (isBasketEmpty(temporaryBasketId)) {
                basketBlockingRepository.delete(temporaryBasketId)
            }
        }
    }

    fun isBasketEmpty(basketId: Long): Boolean {
        val ordersWithCurrentBasket: Int = dsl.selectCount().from(Order.ORDER).where(Order.ORDER.BASKET_ID.eq(basketId))
            .first()
            .map { it.into(Int::class.java) }
        return ordersWithCurrentBasket == 0
    }

    fun deleteById(orderId: Long): Boolean {
        decreaseBasketTotalPriceByOrderId(orderId)
        return dsl.deleteFrom(Order.ORDER)
            .where(Order.ORDER.ID.eq(orderId))
            .execute() == 1
    }

    fun decreaseBasketTotalPriceByOrderId(orderId: Long) {
        val basketTotalPrice: Double? = dsl.select(Basket.BASKET.TOTAL_PRICE).from(Basket.BASKET)
            .where(Basket.BASKET.ID.eq(dsl.select(Order.ORDER.BASKET_ID).from(Order.ORDER).where(Order.ORDER.ID.eq(orderId))))
            .map { it.into(Double::class.java) }.firstOrNull()

        val currentOrder: OrderModel? = getById(orderId)

        val currentOrderPrice = currentOrder?.price

        val totalBasketPrice = basketTotalPrice!! - currentOrderPrice!!

        basketBlockingRepository.update(BasketModel(currentOrder.basketId!!, totalBasketPrice))
    }

    fun getById(orderId: Long): OrderModel? {
        return dsl.select(Order.ORDER.asterisk()).from(Order.ORDER)
            .where(Order.ORDER.ID.eq(orderId))
            .map { it.into(OrderModel::class.java) }
            .firstOrNull()
    }

    fun insert(orderModel: OrderModel): OrderModel {
        if (orderModel.companyProfessionId == null || orderModel.companyOfficeId == null ||
            orderModel.startWorkDate == null || orderModel.totalWorkDays == null
        ) {
            throw Exception("Необходимо заполнить все обязательные поля!")
        }
        var newOrderStatus: OrderStatus? = null
        var basketId: Long? = orderModel.basketId
        var isBasketTemporary = false

        if (orderModel.basketId != null) {
            isBasketTemporary = isPreOrdersInBasket(orderModel.basketId!!)
            if (isBasketTemporary) {
                newOrderStatus = OrderStatus.PRE_ORDERED
            }
        }

        if (orderModel.basketId == null) {
            val newBasketModel: BasketModel = basketBlockingRepository.insert()
            basketId = newBasketModel.id
        } else {
            if (!isBasketTemporary) {
                newOrderStatus = if (orderModel.startWorkDate!!.plusDays(orderModel.totalWorkDays!!)
                        .isBefore(LocalDateTime.now())
                ) {
                    OrderStatus.EXPIRED
                } else {
                    OrderStatus.ACTUAL
                }
            }
        }

        val pastTotalPrice: Double? =
            basketBlockingRepository.getById(basketId!!)?.totalPrice

        val newOrderPrice: Double =
            companyProfessionBlockingRepository.
            getPricePerDayById(orderModel.companyProfessionId!!)* orderModel.totalWorkDays!!

        val totalPrice: Double = if (pastTotalPrice != null) {

            pastTotalPrice + newOrderPrice

        } else {
            newOrderPrice
        }
        basketBlockingRepository.update(BasketModel(basketId, totalPrice))

        val newOrderModel = OrderModel(
            id = DEFAULT_ORDER_ID,
            basketId = basketId,
            companyOfficeId = orderModel.companyOfficeId,
            dateCreated = LocalDateTime.now(),
            isExpired = orderModel.isExpired,
            orderStatus = newOrderStatus ?: orderModel.orderStatus,
            startWorkDate = orderModel.startWorkDate,
            totalWorkDays = orderModel.totalWorkDays,
            price = newOrderPrice,
            companyProfessionId = orderModel.companyProfessionId
        )
        val newOrderRecord: OrderRecord = dsl.newRecord(Order.ORDER)
        newOrderRecord.from(newOrderModel)
        newOrderRecord.reset(Order.ORDER.ID)
        newOrderRecord.store()
        return newOrderRecord.into(OrderModel::class.java)
    }

    private fun isPreOrdersInBasket(basketId: Long): Boolean {
        val preOrdersQuantity: Int = dsl.selectCount().from(Order.ORDER)
            .where(Order.ORDER.BASKET_ID.eq(basketId).and(Order.ORDER.ORDER_STATUS.eq(OrderStatus.PRE_ORDERED.name)))
            .map { it.into(Int::class.java) }
            .first()
        return preOrdersQuantity > 0
    }

    companion object {
        private const val DEFAULT_ORDER_ID: Long = 1

    }
}