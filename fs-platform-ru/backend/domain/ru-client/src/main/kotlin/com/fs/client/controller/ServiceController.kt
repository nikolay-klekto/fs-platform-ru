package com.fs.client.controller

import com.fs.client.repository.ServiceRepository
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
    fun getServiceByID(@PathVariable("id") serviceId: Int) =
        serviceRepository.getById(serviceId)

    @GetMapping
    fun getAllServicesModel() = serviceRepository.getAll()

    @PutMapping("{id}")
    fun updateServiceModelByID(
        @RequestBody serviceModel: ServiceModel,
        @PathVariable("id") id: Int
    ) =
        serviceRepository.updateById(id, serviceModel)

    @DeleteMapping("{id}")
    fun deleteServiceByID(@PathVariable("id") id: Int) =
        serviceRepository.deleteByID(id)

    @PostMapping
    fun insertServiceModel(@RequestBody serviceModel: ServiceModel) =
        serviceRepository.insert(serviceModel)

    @MutationMapping
    open fun addService(@Argument services: ServiceModel): Mono<ServiceModel> {
        return serviceRepository.insert(services)
    }

    @MutationMapping
    open fun updateServiceById(@Arguments id: Int, service: ServiceModel): Mono<Boolean> {
        return serviceRepository.updateById(id, service)
    }

    @MutationMapping
    open fun deleteServiceById(@Argument id: Int): Mono<Boolean> {
        return serviceRepository.deleteByID(id)
    }

    @QueryMapping
    open fun serviceById(@Argument id: Int): Mono<ServiceModel> {
        return serviceRepository.getById(id)
    }

    @QueryMapping
    open fun getAllServices(): Flux<ServiceModel> {
        return serviceRepository.getAll()
    }
}