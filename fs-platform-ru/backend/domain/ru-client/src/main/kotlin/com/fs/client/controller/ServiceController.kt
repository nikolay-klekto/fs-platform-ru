package com.fs.client.controller

import com.fs.client.repository.ServiceRepository
import com.fs.service.ru.ServiceModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import reactor.core.publisher.Mono

//@RestController
@RequestMapping("/service")
class ServiceController(
    private val serviceRepository: ServiceRepository
) {
    @QueryMapping
    open fun serviceById(@Argument id: Int): Mono<ServiceModel> {
        return serviceRepository.getServiceById(id)
    }
}