package com.fs.client.controller

import com.fs.client.repository.ServiceRepository
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Service")
@RestController
@RequestMapping("/service", produces = ["application/json"])
open class ServiceController(
    open val serviceRepository: ServiceRepository
) {

//    @QueryMapping
//    open fun serviceById(@Argument id: Int): ServiceModel {
//        return serviceRepository.serviceById(id)
//    }

    @GetMapping("{id}")
    fun getServiceByID(@PathVariable("id") serviceId: Int) =
        serviceRepository.getById(serviceId)

}