package com.fs.client.repository.blocked

import com.fs.client.converter.BasketModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.domain.jooq.tables.pojos.Basket
import com.fs.domain.jooq.tables.records.BasketRecord
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext

abstract class BasketBlockingRepository(
    open val dsl: DSLContext,
    open val converter: BasketModelConverter
) {
    fun getById(basketId: Long): BasketModel? =

        dsl.select(BASKET.asterisk())
            .from(BASKET)
            .where(BASKET.ID.eq(basketId))
            .map { it.into(Basket::class.java) }
            .map(converter::toModel)
            .firstOrNull()

    fun insert(): BasketModel {
        val newBasket = BasketModel(0, 0.0)
        val newBasketRecord: BasketRecord = dsl.newRecord(BASKET)
        newBasketRecord.from(newBasket)
        newBasketRecord.reset(BASKET.ID)
        newBasketRecord.store()
        return converter.toModel(newBasketRecord.into(Basket::class.java))
    }

    fun update(basket: BasketModel): Boolean {
        return dsl.update(BASKET)
            .set(BASKET.TOTAL_PRICE, basket.totalPrice)
            .where(BASKET.ID.eq(basket.id))
            .execute() == 1
    }

    fun delete(basketId: Long): Boolean {
        return dsl.deleteFrom(BASKET)
            .where(BASKET.ID.eq(basketId))
            .execute() == 1
    }
}
