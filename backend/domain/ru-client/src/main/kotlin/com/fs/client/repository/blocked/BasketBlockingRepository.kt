package com.fs.client.repository.blocked

import com.fs.client.converter.BasketModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.domain.jooq.tables.pojos.Basket
import com.fs.domain.jooq.tables.records.BasketRecord
import com.fs.service.ru.BasketModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class BasketBlockingRepository(
    open val dsl: DSLContext,
    open val converter: BasketModelConverter
) {
    suspend fun getById(basketId: Long): BasketModel? =
        withContext(Dispatchers.IO) {
            dsl.select(BASKET.asterisk())
                .from(BASKET)
                .where(BASKET.ID.eq(basketId))
                .map { it.into(Basket::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun insert(): BasketModel {
        return withContext(Dispatchers.IO) {
            val newBasket = BasketModel(0, 0.0)
            val newBasketRecord: BasketRecord = dsl.newRecord(BASKET)
            newBasketRecord.from(newBasket)
            newBasketRecord.reset(BASKET.ID)
            newBasketRecord.store()
            converter.toModel(newBasketRecord.into(Basket::class.java))
        }
    }

    suspend fun update(basket: BasketModel): Boolean {
        return withContext(Dispatchers.IO) {
            dsl.update(BASKET)
                .set(BASKET.TOTAL_PRICE, basket.totalPrice)
                .where(BASKET.ID.eq(basket.id))
                .execute() == 1
        }
    }

    suspend fun delete(basketId: Long): Boolean {
        return withContext(Dispatchers.IO) {
            dsl.deleteFrom(BASKET)
                .where(BASKET.ID.eq(basketId))
                .execute() == 1
        }
    }
}
