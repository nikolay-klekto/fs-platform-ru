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
    suspend fun getOrdersByClientId(@Argument clientId: String): List<OrderModel> {
        return orderRepository.getAllOrdersByClientId(clientId)
    }

    @QueryMapping
    suspend fun getOrdersByBasketId(@Argument basketId: Long): List<OrderModel> {
        return orderRepository.getAllOrdersByBasketID(basketId)
    }

    @QueryMapping
    suspend fun getOrdersByBasketIdWebFlux(@Argument basketId: Long): Flux<OrderModel> {
        return orderRepository.getAllOrdersByBasketIDWebFlux(basketId)
    }

    @QueryMapping
    suspend fun getOrdersByBasketIdWebFluxPlus(@Argument basketId: Long): Flux<OrderModel> {
        return orderRepository.getAllOrdersByBasketIDWebFluxPlus(basketId)
    }

    @QueryMapping
    fun getOrdersByBasketIdSimple(@Argument basketId: Long): List<OrderModel> {
        return orderRepository.getAllOrdersByBasketIDSimple(basketId)
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
}