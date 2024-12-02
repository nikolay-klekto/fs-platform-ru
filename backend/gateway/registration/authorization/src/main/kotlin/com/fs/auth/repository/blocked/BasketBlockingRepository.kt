package com.fs.auth.repository.blocked

import com.fs.domain.jooq.tables.Basket
import com.fs.domain.jooq.tables.records.BasketRecord
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext

abstract class BasketBlockingRepository(
    open val dsl: DSLContext
) {

    fun insert(): BasketModel {
        val newBasket = BasketModel(0, 0.0)
        val newBasketRecord: BasketRecord = dsl.newRecord(Basket.BASKET)
        newBasketRecord.from(newBasket)
        newBasketRecord.reset(Basket.BASKET.ID)
        newBasketRecord.store()
        return newBasketRecord.into(BasketModel::class.java)
    }

    fun delete(basketId: Long): Boolean {
        return dsl.deleteFrom(Basket.BASKET)
            .where(Basket.BASKET.ID.eq(basketId))
            .execute() == 1
    }

    fun update(basket: BasketModel): Boolean {
        return dsl.update(Basket.BASKET)
            .set(Basket.BASKET.TOTAL_PRICE, basket.totalPrice)
            .where(Basket.BASKET.ID.eq(basket.id))
            .execute() == 1
    }

    fun getById(basketId: Long): BasketModel? =

        dsl.select(Basket.BASKET.asterisk())
            .from(Basket.BASKET)
            .where(Basket.BASKET.ID.eq(basketId))
            .map { it.into(BasketModel::class.java) }
            .firstOrNull()
}