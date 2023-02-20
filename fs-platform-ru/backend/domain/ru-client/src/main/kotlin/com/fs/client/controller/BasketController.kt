package com.fs.client.controller

import com.fs.client.repository.BasketRepository
import com.fs.service.ru.BasketModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "Basket")
@RestController
@RequestMapping("/basket", produces = ["application/json"])
open class BasketController(
    open val basketRepository: BasketRepository
) {

    @GetMapping("{id}")
    fun getBasketByID(@PathVariable("id") basketId: Int) =
        basketRepository.getById(basketId)

    @PutMapping("{id}")
    fun updateBasketByID(
        @RequestBody basketModel: BasketModel,
        @PathVariable("id") id: Int
    ) = basketRepository
        .updateById(id, basketModel)
}