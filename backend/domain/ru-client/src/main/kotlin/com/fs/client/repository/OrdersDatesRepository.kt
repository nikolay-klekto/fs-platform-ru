package com.fs.client.repository

import com.fs.domain.jooq.tables.OrderDates.Companion.ORDER_DATES
import com.fs.domain.jooq.tables.pojos.OrderDates
import com.fs.domain.jooq.tables.records.OrderDatesRecord
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDate

abstract class OrdersDatesRepository(
    open val dsl: DSLContext
) {
    fun insertOrderDate(orderDate: OrderDates): Mono<OrderDates> {
        return Mono.fromSupplier {
            val newOrderDate: OrderDatesRecord = dsl.newRecord(ORDER_DATES)
            newOrderDate.from(orderDate)
            newOrderDate.dateCreated = LocalDate.now()
            newOrderDate.reset(ORDER_DATES.ID)
            newOrderDate.store()
            return@fromSupplier newOrderDate.into(OrderDates::class.java)
        }
    }

    fun getOrderDatesByProfessionCompanyId(companyProfessionId: Long): Flux<OrderDates> {
        return Flux.from(
            dsl.select(ORDER_DATES.asterisk()).from(ORDER_DATES)
                .where(
                    ORDER_DATES.COMPANY_PROFESSION_ID.eq(companyProfessionId)
                        .and(ORDER_DATES.FREE_PLACES.greaterThan(0))
                )
        )
            .map { it.into(OrderDates::class.java) }
    }

    private fun getFreePlacesByOrderDatesId(orderDateId: Long): Int {
        return dsl.select(ORDER_DATES.FREE_PLACES).from(ORDER_DATES)
            .where(ORDER_DATES.ID.eq(orderDateId))
            .first()
            .map { it.into(Int::class.java) }
    }

    fun decreaseFreePlacesByOrderDatesId(orderDateId: Long): Boolean {
        var freePlaces = getFreePlacesByOrderDatesId(orderDateId)
        if (freePlaces == 0) {
            throw Exception("Все свободные места заняты. Пожалуйста, выберите другие даты")
        }
        return dsl.update(ORDER_DATES)
            .set(ORDER_DATES.FREE_PLACES, --freePlaces)
            .where(ORDER_DATES.ID.eq(orderDateId))
            .execute() > 0

    }

}
