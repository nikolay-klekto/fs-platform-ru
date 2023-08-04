package com.fs.client.repository.blocked

import com.fs.client.service.CountryModelConverter
import com.fs.client.service.OrderModelConverter
import com.fs.domain.jooq.tables.Basket
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.service.ru.BasketModel
import com.fs.service.ru.OrderModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class OrderBlockingRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository
) {

    fun getById(orderId: Long): OrderModel? {
        return dsl.select(ORDER.asterisk()).from(ORDER)
            .where(ORDER.ID.eq(orderId))
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun decreaseBasketTotalPriceByOrderId(orderId: Long) {
        val basketTotalPrice: Double? = dsl.select(BASKET.TOTAL_PRICE).from(BASKET)
            .where(BASKET.ID.eq(dsl.select(ORDER.BASKET_ID).from(ORDER).where(ORDER.ID.eq(orderId))))
            .map { it.into(Double::class.java)}.firstOrNull()

        val currentOrder: OrderModel? = getById(orderId)

        val currentOrderPrice = currentOrder?.price

        val totalBasketPrice = basketTotalPrice!! - currentOrderPrice!!

        basketBlockingRepository.update(BasketModel(currentOrder.basketId!!, totalBasketPrice))
    }

    fun isBasketEmpty(basketId: Long): Boolean {
        val ordersWithCurrentBasket: Int = dsl.selectCount().where(ORDER.BASKET_ID.eq(basketId))
            .first()
            .map{it.into(Int::class.java)}
        return ordersWithCurrentBasket > 0
    }
}