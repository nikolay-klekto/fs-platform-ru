package com.fs.auth.repository.blocked

import com.fs.auth.jooq.tables.Basket.Companion.BASKET
import com.fs.auth.jooq.tables.Order.Companion.ORDER
import com.fs.auth.jooq.tables.records.OrderRecord
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
                contractNumber = temporaryOrder.contractNumber
            )
            insert(updatableOrderModel)
            deleteById(temporaryOrder.id!!)
            if (isBasketEmpty(temporaryBasketId)) {
                basketBlockingRepository.delete(temporaryBasketId)
            }
        }
    }

    private fun isBasketEmpty(basketId: Long): Boolean {
        val ordersWithCurrentBasket: Int = dsl.selectCount().from(ORDER).where(ORDER.BASKET_ID.eq(basketId))
            .first()
            .map { it.into(Int::class.java) }
        return ordersWithCurrentBasket == 0
    }

    private fun deleteById(orderId: Long): Boolean {
        decreaseBasketTotalPriceByOrderId(orderId)
        return dsl.deleteFrom(ORDER)
            .where(ORDER.ID.eq(orderId))
            .execute() == 1
    }

    private fun decreaseBasketTotalPriceByOrderId(orderId: Long) {
        val basketTotalPrice: Double? = dsl.select(BASKET.TOTAL_PRICE).from(BASKET)
            .where(BASKET.ID.eq(dsl.select(ORDER.BASKET_ID).from(ORDER).where(ORDER.ID.eq(orderId))))
            .map { it.into(Double::class.java) }.firstOrNull()

        val currentOrder: OrderModel? = getById(orderId)

        val currentOrderPrice = currentOrder?.price

        val totalBasketPrice = basketTotalPrice!! - currentOrderPrice!!

        basketBlockingRepository.update(BasketModel(currentOrder.basketId!!, totalBasketPrice))
    }

    private fun getById(orderId: Long): OrderModel? {
        return dsl.select(ORDER.asterisk()).from(ORDER)
            .where(ORDER.ID.eq(orderId))
            .map { it.into(OrderModel::class.java) }
            .firstOrNull()
    }

    private fun insert(orderModel: OrderModel): OrderModel {
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
            orderStatus = orderModel.orderStatus ?: newOrderStatus,
            startWorkDate = orderModel.startWorkDate,
            totalWorkDays = orderModel.totalWorkDays,
            price = newOrderPrice,
            companyProfessionId = orderModel.companyProfessionId,
            contractNumber = orderModel.contractNumber
        )
        val newOrderRecord: OrderRecord = dsl.newRecord(ORDER)
        newOrderRecord.from(newOrderModel)
        newOrderRecord.reset(ORDER.ID)
        newOrderRecord.store()
        return newOrderRecord.into(OrderModel::class.java)
    }

//    private fun isPreOrdersInBasket(basketId: Long): Boolean {
//        val preOrdersQuantity: Int = dsl.selectCount().from(ORDER)
//            .where(ORDER.BASKET_ID.eq(basketId).and(ORDER.ORDER_STATUS.eq(OrderStatus.PRE_ORDERED.name)))
//            .map { it.into(Int::class.java) }
//            .first()
//        return preOrdersQuantity > 0
//    }

    companion object {
        private const val DEFAULT_ORDER_ID: Long = 1

    }
}