package com.fs.client.repository.blocked

import com.fs.client.service.CountryModelConverter
import com.fs.client.service.OrderModelConverter
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.service.ru.OrderModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class OrderBlockingRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter
) {

    fun getById(orderId: Long): OrderModel? {
        return dsl.select(ORDER.asterisk()).from(ORDER)
            .where(ORDER.ID.eq(orderId))
            .map { it.into(Order::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}