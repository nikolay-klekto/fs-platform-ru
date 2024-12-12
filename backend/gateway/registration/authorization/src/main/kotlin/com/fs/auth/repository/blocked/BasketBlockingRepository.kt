package com.fs.auth.repository.blocked

import com.fs.auth.jooq.tables.Basket.Companion.BASKET
import com.fs.auth.jooq.tables.records.BasketRecord
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext

abstract class BasketBlockingRepository(
    open val dsl: DSLContext
) {

    fun insert(): BasketModel {
        val newBasket = BasketModel(0, 0.0)
        val newBasketRecord: BasketRecord = dsl.newRecord(BASKET)
        newBasketRecord.from(newBasket)
        newBasketRecord.reset(BASKET.ID)
        newBasketRecord.store()
        return newBasketRecord.into(BasketModel::class.java)
    }

    fun delete(basketId: Long): Boolean {
        return dsl.deleteFrom(BASKET)
            .where(BASKET.ID.eq(basketId))
            .execute() == 1
    }

    fun update(basket: BasketModel): Boolean {
        return dsl.update(BASKET)
            .set(BASKET.TOTAL_PRICE, basket.totalPrice)
            .where(BASKET.ID.eq(basket.id))
            .execute() == 1
    }

    fun getById(basketId: Long): BasketModel? =

        dsl.select(BASKET.asterisk())
            .from(BASKET)
            .where(BASKET.ID.eq(basketId))
            .map { it.into(BasketModel::class.java) }
            .firstOrNull()
}