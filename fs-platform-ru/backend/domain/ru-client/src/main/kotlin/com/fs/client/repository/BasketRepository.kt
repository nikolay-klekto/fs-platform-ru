package com.fs.client.repository

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.service.BasketModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class BasketRepository(
    open val dsl: DSLContext,
    open val converter: BasketModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository
) {
    fun getBasketById(id: Long): Mono<BasketModel> {
        return Mono.fromSupplier {
            basketBlockingRepository.getById(id)
        }
    }

    fun updateBasket(basket: BasketModel): Mono<Boolean> {
        return Mono.fromSupplier {
            basketBlockingRepository.update(basket)
        }
    }

    fun insertBasket(): Mono<BasketModel> {
        return Mono.fromSupplier {
            basketBlockingRepository.insert()
        }
    }
}