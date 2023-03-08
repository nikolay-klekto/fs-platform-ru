package com.fs.client.controller

import com.fs.client.repository.PositionRepository
import com.fs.service.ru.OrderModel
import com.fs.service.ru.PositionModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Position")
@RestController
@RequestMapping("/position", produces = ["application/json"])
open class PositionController(
    open val positionRepository: PositionRepository
) {

    @QueryMapping
    open fun getPositionById(@Argument id: Long): Mono<PositionModel> {
        return positionRepository.getById(id)
    }

    @QueryMapping
    open fun getAllPositionsByCompanyId(@Argument companyId: Long): Flux<PositionModel> {
        return positionRepository.getAllByCompanyId(companyId)
    }

    @MutationMapping
    open fun addPosition(@Argument position: PositionModel): Mono<PositionModel> {
        return positionRepository.insertPosition(position)
    }

    @MutationMapping
    open fun addCompanyPosition(
        @Argument companyId: Long,
        @Argument position: PositionModel
    ): Mono<PositionModel> {
        return positionRepository.initCompanyPosition(companyId, position)
    }

    @MutationMapping
    open fun updatePosition(@Argument position: PositionModel): Mono<Boolean> {
        return positionRepository.update(position)
    }

    @MutationMapping
    open fun deletePosition(@Argument id: Long): Mono<Boolean> {
        return positionRepository.delete(id)
    }

    @SchemaMapping(typeName = "Order", field = "position")
    fun getPositionForOrder(order: OrderModel): Mono<PositionModel> {
        return positionRepository.getById(order.positionId!!)
    }
}
