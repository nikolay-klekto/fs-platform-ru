package com.fs.client.controller

import com.fs.client.repository.BasketRepository
import com.fs.service.ru.BasketModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.*

@Tag(name = "Basket")
@RestController
@RequestMapping("/basket", produces = ["application/json"])
class BasketController(
    private val basketRepository: BasketRepository
) {

    @GetMapping("{id}")
    suspend fun getBasketByID(@PathVariable("id") basketId: Long): BasketModel? =
        basketRepository.getBasketById(basketId)

    @PutMapping("{id}")
    suspend fun updateBasketByID(
        @RequestBody basketModel: BasketModel,
    ): Boolean {
        return basketRepository.updateBasket(basketModel)
    }

    @QueryMapping
    suspend fun getBasketById(@Argument id: Long): BasketModel? {
        return basketRepository.getBasketById(id)
    }

    @QueryMapping
    suspend fun getAllBaskets(): List<BasketModel> {
        return basketRepository.getAllBaskets()
    }

    @MutationMapping
    suspend fun addBasket(): BasketModel {
        return basketRepository.insertBasket()
    }

    @MutationMapping
    suspend fun updateBasket(@Argument basket: BasketModel): Boolean {
        return basketRepository.updateBasket(basket)
    }

}
