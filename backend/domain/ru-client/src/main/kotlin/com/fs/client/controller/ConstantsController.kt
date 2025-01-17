package com.fs.client.controller

import com.fs.client.repository.ConstantsRepository
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
open class ConstantsController(
    open val constantsRepository: ConstantsRepository
) {

    @QueryMapping
    open fun getDaysForPayOrder(): Mono<Int> {
        return constantsRepository.getDaysForPayOrder()
    }
}