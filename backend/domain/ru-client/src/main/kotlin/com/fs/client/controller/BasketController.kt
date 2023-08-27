package com.fs.client.controller

import com.fs.client.repository.BasketRepository
import com.fs.service.ru.BasketModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@Tag(name = "Basket")
@RestController
@RequestMapping("/basket", produces = ["application/json"])
open class BasketController(
    open val basketRepository: BasketRepository
) {

    @GetMapping("{id}")
    fun getBasketByID(@PathVariable("id") basketId: Long) =
        basketRepository.getBasketById(basketId)

    @PutMapping("{id}")
    fun updateBasketByID(
        @RequestBody basketModel: BasketModel,
    ): Mono<Boolean> {
        return basketRepository.updateBasket(basketModel)
    }

    @QueryMapping
    open fun getBasketById(@Argument id: Long): Mono<BasketModel> {
        return basketRepository.getBasketById(id)
    }

    @MutationMapping
    open fun addBasket(): Mono<BasketModel> {
        return basketRepository.insertBasket()
    }

    @MutationMapping
    open fun updateBasket(@Argument basket: BasketModel): Mono<Boolean> {
        return basketRepository.updateBasket(basket)
    }

}