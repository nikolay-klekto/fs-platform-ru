package com.fs.client.controller

import com.fs.client.repository.OrderRepository
import com.fs.service.ru.OrderModel
import com.fs.service.ru.OrderModelInput
import com.fs.service.ru.enums.OrderStatus
import com.fs.service.ru.errors.ErrorModel
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
        return orderRepository.getOrderByrId(id)
    }

    @QueryMapping
    fun getAllOrders(): Flux<OrderModel> {
        return orderRepository.getAllOrders()
    }

    @QueryMapping
    fun getOrdersByClientId(
        @Argument clientId: String): Flux<OrderModel> {
        return orderRepository.getAllOrdersByClientId(clientId)
    }

    @QueryMapping
    fun getOrdersByBasketId(
        @Argument basketId: Long): Flux<OrderModel> {
        return orderRepository.getAllOrdersByBasketID(basketId)
    }

    @MutationMapping
    fun addOrder(@Argument order: OrderModelInput): Mono<OrderModel> {
        return orderRepository.insertOrder(order)
    }

    @MutationMapping
    fun addUnAuthorizeOrder(@Argument order: OrderModelInput): Mono<OrderModel> {
        return orderRepository.insertOrder(order)
    }

    @MutationMapping
    fun updateOrder(@Argument order: OrderModel): Mono<Boolean> {
        return orderRepository.updateOrder(order)
    }

    @MutationMapping
    fun placeOrder(@Argument orderId: Long): Mono<ErrorModel<Boolean>> {
        return orderRepository.confirmOrder(orderId)
            .onErrorResume {
                return@onErrorResume Mono.just(ErrorModel(null, it.message))
            }
    }

    @MutationMapping
    fun changeOrderStatusAfterPay(
        @Argument orderId: Long,
        @Argument isPaySuccess: Boolean): Mono<Boolean> {
        return orderRepository.changeOrderStatusAfterPay(orderId, isPaySuccess)
    }

    @MutationMapping
    fun updateOrderContractNumber(@Argument order: OrderModel): Mono<Boolean> {
        return orderRepository.updateOrderContractNumber(order)
    }

    @MutationMapping
    fun deleteFinalOrderById(@Argument id: Long): Mono<Boolean> {
        return orderRepository.deleteFinalOrderById(id)
    }

    @MutationMapping
    fun deleteOrderById(
        @Argument id: Long,
        @Argument orderStatus: OrderStatus
    ): Mono<Boolean> {
        return orderRepository.deleteOrderById(id, orderStatus)
    }

    @MutationMapping
    fun deleteAllOrdersByBasketId(
        @Argument basketId: Long,
        @Argument orderStatus: OrderStatus
    ): Mono<Boolean> {
        return orderRepository.deleteAllOrdersByBasketId(basketId, orderStatus)
    }

    @MutationMapping
    fun deleteAllOrdersByClientId(
        @Argument clientId: String,
        @Argument orderStatus: OrderStatus): Mono<Boolean> {
        return orderRepository.deleteAllOrdersByClientId(clientId, orderStatus)
    }
}