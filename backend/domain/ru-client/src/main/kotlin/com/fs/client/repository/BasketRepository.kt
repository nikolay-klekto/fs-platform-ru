package com.fs.client.repository

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.converter.BasketModelConverter
import com.fs.domain.jooq.tables.Basket.Companion.BASKET
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
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

    fun getAllBaskets(): Flux<BasketModel> {
        return Flux.from(
            dsl.selectFrom(BASKET)
        ).map { it.into(BasketModel::class.java) }
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