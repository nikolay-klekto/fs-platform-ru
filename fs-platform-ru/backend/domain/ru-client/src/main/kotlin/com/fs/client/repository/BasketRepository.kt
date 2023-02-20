package com.fs.client.repository

import com.fs.client.service.BasketModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.domain.jooq.tables.pojos.Basket
import com.fs.domain.jooq.tables.records.BasketRecord
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class BasketRepository(open val dsl: DSLContext, open val converter: BasketModelConverter) {
    fun getById(id: Int) =
        Mono.from(
            dsl.select(BASKET.asterisk())
                .from(BASKET)
                .where(BASKET.ID.eq(id))

        )
            .map { it.into(Basket::class.java) }
            .map(converter::toModel)

    fun updateById(id: Int, basket: BasketModel) =
        Mono.from(
            dsl.update(BASKET)
                .set(BASKET.TOTAL_PRICE, basket.totalPrice)
                .where(BASKET.ID.eq(id))
        ).then()

    fun insert() =
        Mono.fromSupplier {
            val newBasket = BasketModel(0, "")
            val newBasketRecord: BasketRecord = dsl.newRecord(BASKET)
            newBasketRecord.from(newBasket)
            newBasketRecord.reset(BASKET.ID)
            newBasketRecord.store()
            return@fromSupplier newBasketRecord.into(Basket::class.java)
        }
            .map(converter::toModel)
}