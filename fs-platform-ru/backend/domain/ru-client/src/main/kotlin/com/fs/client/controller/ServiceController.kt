package com.fs.client.controller

import com.fs.client.repository.ServiceRepository
import com.fs.service.ru.ServiceModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "Service")
@RestController
@RequestMapping("/service", produces = ["application/json"])
open class ServiceController(
    open val serviceRepository: ServiceRepository
) {

//    @QueryMapping
//    open fun serviceById(@Argument id: Int): Mono<ServiceModel> {
//        return serviceRepository.getById(id)
//    }

    @GetMapping("{id}")
    fun getServiceByID(@PathVariable("id") serviceId: Int) =
        serviceRepository.getById(serviceId)

    @GetMapping
    fun getAllServices() =
        serviceRepository.getAll()

    @PutMapping("{id}")
    fun updateServiceByID(
        @RequestBody serviceModel: ServiceModel,
        @PathVariable("id") id: Int
    ) = serviceRepository
        .updateById(id, serviceModel)

    @DeleteMapping("{id}")
    fun deleteServiceByID(
        @PathVariable("id") id: Int
    ) =
        serviceRepository.deleteByID(id)

    @PostMapping
    fun insertServiceModel(
        @RequestBody serviceModel: ServiceModel
    ) =
        serviceRepository.insert(serviceModel)

}