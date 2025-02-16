package com.fs.client.repository

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.converter.BasketModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.service.ru.BasketModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class BasketRepository(
    open val dsl: DSLContext,
    open val converter: BasketModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository
) {
    suspend fun getBasketById(id: Long): BasketModel? =
        withContext(Dispatchers.IO) {
            basketBlockingRepository.getById(id)
        }

    suspend fun getAllBaskets(): List<BasketModel> =
        withContext(Dispatchers.IO) {
            dsl.selectFrom(BASKET)
                .map { it.into(BasketModel::class.java) }
        }

    suspend fun updateBasket(basket: BasketModel): Boolean =
        withContext(Dispatchers.IO) {
            basketBlockingRepository.update(basket)
        }

    suspend fun insertBasket(): BasketModel =
        withContext(Dispatchers.IO) {
            basketBlockingRepository.insert()
        }
}
