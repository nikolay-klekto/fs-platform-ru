package com.fs.client.repository

import com.fs.domain.jooq.tables.OrderDates.Companion.ORDER_DATES
import com.fs.domain.jooq.tables.pojos.OrderDates
import com.fs.domain.jooq.tables.records.OrderDatesRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDate

abstract class OrdersDatesRepository(
    open val dsl: DSLContext
) {
    suspend fun insertOrderDate(orderDate: OrderDates): OrderDates =
        withContext(Dispatchers.IO) {
            val newOrderDate: OrderDatesRecord = dsl.newRecord(ORDER_DATES)
            newOrderDate.from(orderDate)
            newOrderDate.dateCreated = LocalDate.now()
            newOrderDate.reset(ORDER_DATES.ID)
            newOrderDate.store()
            newOrderDate.into(OrderDates::class.java)
        }

    suspend fun getOrderDatesByProfessionCompanyId(companyProfessionId: Long): List<OrderDates> =
        withContext(Dispatchers.IO) {
            dsl.select(ORDER_DATES.asterisk()).from(ORDER_DATES)
                .where(
                    ORDER_DATES.COMPANY_PROFESSION_ID.eq(companyProfessionId)
                        .and(ORDER_DATES.FREE_PLACES.greaterThan(0))
                ).map { it.into(OrderDates::class.java) }
        }

    private suspend fun getFreePlacesByOrderDatesId(orderDateId: Long): Int =
        withContext(Dispatchers.IO) {
            dsl.select(ORDER_DATES.FREE_PLACES).from(ORDER_DATES)
                .where(ORDER_DATES.ID.eq(orderDateId))
                .first()
                .map { it.into(Int::class.java) }
        }

    suspend fun decreaseFreePlacesByOrderDatesId(orderDateId: Long): Boolean =
        withContext(Dispatchers.IO) {
            var freePlaces = getFreePlacesByOrderDatesId(orderDateId)
            if (freePlaces == 0) {
                throw Exception("Все свободные места заняты. Пожалуйста, выберите другие даты")
            }
            dsl.update(ORDER_DATES)
                .set(ORDER_DATES.FREE_PLACES, --freePlaces)
                .where(ORDER_DATES.ID.eq(orderDateId))
                .execute() > 0
        }
}
