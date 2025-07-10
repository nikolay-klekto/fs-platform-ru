package com.fs.client.controller

import com.fs.client.repository.OrderRepository
import com.fs.service.ru.OrderModel
<<<<<<< HEAD
=======
import com.fs.service.ru.OrderModelInput
import com.fs.service.ru.enums.OrderStatus
import com.fs.service.ru.errors.ErrorModel
>>>>>>> origin/main
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@Tag(name = "Order")
@RestController
@RequestMapping("/order", produces = ["application/json"])
open class OrderController(open val orderRepository: OrderRepository) {

    @QueryMapping
    suspend fun getOrderById(@Argument id: Long): OrderModel? {
        return orderRepository.getOrderById(id)
    }

    @QueryMapping
    suspend fun getAllOrders(): List<OrderModel> {
        return orderRepository.getAllOrders()
    }

    @QueryMapping
<<<<<<< HEAD
    fun getOrdersByClientId(@Argument clientId: Long): Flux<OrderModel> {
=======
    suspend fun getOrdersByClientId(@Argument clientId: String): List<OrderModel> {
>>>>>>> origin/main
        return orderRepository.getAllOrdersByClientId(clientId)
    }

    @QueryMapping
<<<<<<< HEAD
    fun getOrdersByBasketId(@Argument basketId: Long): Flux<OrderModel> {
=======
    suspend fun getOrdersByBasketId(@Argument basketId: Long): List<OrderModel> {
>>>>>>> origin/main
        return orderRepository.getAllOrdersByBasketID(basketId)
    }

    @MutationMapping
    suspend fun addOrder(@Argument order: OrderModelInput): OrderModel {
        return orderRepository.insertOrder(order)
    }

    @MutationMapping
    suspend fun addUnAuthorizeOrder(@Argument order: OrderModelInput): OrderModel {
        return orderRepository.insertOrder(order)
    }

    @MutationMapping
    suspend fun updateOrder(@Argument order: OrderModel): Boolean {
        return orderRepository.updateOrder(order)
    }

    @MutationMapping
    suspend fun placeOrder(@Argument orderId: Long): ErrorModel<Boolean> {
        return try {
            orderRepository.confirmOrder(orderId)
        } catch (e: Exception) {
            ErrorModel(null, e.message)
        }
    }

    @MutationMapping
    suspend fun changeOrderStatusAfterPay(
        @Argument orderId: Long,
        @Argument isPaySuccess: Boolean
    ): Boolean {
        return orderRepository.changeOrderStatusAfterPay(orderId, isPaySuccess)
    }
<<<<<<< HEAD
=======

    @MutationMapping
    suspend fun updateOrderContractNumber(@Argument order: OrderModel): Boolean {
        return orderRepository.updateOrderContractNumber(order)
    }

    @MutationMapping
    suspend fun deleteFinalOrderById(@Argument id: Long): Boolean {
        return orderRepository.deleteFinalOrderById(id)
    }

    @MutationMapping
    suspend fun deleteOrderById(
        @Argument id: Long,
        @Argument orderStatus: OrderStatus
    ): Boolean {
        return orderRepository.deleteOrderById(id, orderStatus)
    }

    @MutationMapping
    suspend fun deleteAllOrdersByBasketId(
        @Argument basketId: Long,
        @Argument orderStatus: OrderStatus
    ): Boolean {
        return orderRepository.deleteAllOrdersByBasketId(basketId, orderStatus)
    }

    @MutationMapping
    suspend fun deleteAllOrdersByClientId(
        @Argument clientId: String,
        @Argument orderStatus: OrderStatus
    ): Boolean {
        return orderRepository.deleteAllOrdersByClientId(clientId, orderStatus)
    }
>>>>>>> origin/main
}