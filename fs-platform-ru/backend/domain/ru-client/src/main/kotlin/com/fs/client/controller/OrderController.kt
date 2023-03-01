package com.fs.client.controller

import com.fs.client.repository.OrderRepository
import com.fs.service.ru.OrderModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Order")
@RestController
@RequestMapping("/order", produces = ["application/json"])
open class OrderController(open val orderRepository: OrderRepository) {

    @QueryMapping
    fun getOrderById(@Argument id: Long): Mono<OrderModel> {
        return orderRepository.getByOrderId(id)
    }

    @QueryMapping
    fun getOrdersByClientId(@Argument clientId: Long): Flux<OrderModel> {
        return orderRepository.getAllOrdersByClientId(clientId)
    }

    @QueryMapping
    fun getOrdersByBasketId(@Argument basketId: Long): Flux<OrderModel> {
        return orderRepository.getAllOrdersByBasketID(basketId)
    }

    @MutationMapping
    fun addOrder(@Argument order: OrderModel): Mono<OrderModel> {
        return orderRepository.insertOrder(order)
    }

    @MutationMapping
    fun updateOrder(@Argument order: OrderModel): Mono<Boolean> {
        return orderRepository.updateOrder(order)
    }
}