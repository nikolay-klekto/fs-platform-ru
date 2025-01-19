package com.fs.client.controller

import com.fs.client.repository.ClientLettersRepository
import com.fs.client.repository.ReviewRepository
import com.fs.domain.jooq.tables.pojos.ClientsLetters
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
open class ClientLettersController(
    open val clientLetterRepository: ClientLettersRepository
) {

    @MutationMapping
    open fun insertClientLetter(@Argument clientLetter: ClientsLetters): Mono<ClientsLetters> {
        return clientLetterRepository.insertLetter(clientLetter)
    }

}