package com.fs.client.controller

import com.fs.client.repository.ServiceRepository
import com.fs.service.ru.OrderModel
import com.fs.service.ru.ServiceModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.*
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Service")
@RestController
@RequestMapping("/service", produces = ["application/json"])
open class ServiceController(
    open val serviceRepository: ServiceRepository
) {

    @GetMapping("{id}")
    fun getServiceByID(@PathVariable("id") serviceId: Long) =
        serviceRepository.getServiceById(serviceId)

    @GetMapping
    fun getAllServicesModel() = serviceRepository.getAllServices()

    @PutMapping("{id}")
    fun updateServiceModelByID(
        @RequestBody serviceModel: ServiceModel,
        @PathVariable("id") id: Long
    ) =
        serviceRepository.updateServiceById(id, serviceModel)

    @DeleteMapping("{id}")
    fun deleteServiceByID(@PathVariable("id") id: Long) =
        serviceRepository.deleteByID(id)

    @PostMapping
    fun insertServiceModel(@RequestBody serviceModel: ServiceModel) =
        serviceRepository.insert(serviceModel)

    @MutationMapping
    open fun addService(@Argument services: ServiceModel): Mono<ServiceModel> {
        return serviceRepository.insert(services)
    }

    @MutationMapping
    open fun updateServiceById(
        @Argument id: Long,
        @Argument service: ServiceModel
    ): Mono<Boolean> {
        return serviceRepository.updateServiceById(id, service)
    }

    @MutationMapping
    open fun deleteServiceById(@Argument id: Long): Mono<Boolean> {
        return serviceRepository.deleteByID(id)
    }

    @QueryMapping
    open fun getServiceById(@Argument id: Long): Mono<ServiceModel> {
        return serviceRepository.getServiceById(id)
    }

    @QueryMapping
    open fun getAllServices(): Flux<ServiceModel> {
        return serviceRepository.getAllServices()
    }

    @SchemaMapping(typeName = "Order", field = "service")
    fun getServiceForOrder(order: OrderModel): Mono<ServiceModel> {
        return serviceRepository.getServiceById(order.serviceId!!)
    }
}