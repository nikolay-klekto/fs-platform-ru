package com.fs.client.controller

import com.fs.client.repository.ClientLettersRepository
import com.fs.domain.jooq.tables.pojos.ClientsLetters
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ClientLettersController(
    private val clientLetterRepository: ClientLettersRepository
) {

    @MutationMapping
    suspend fun insertClientLetter(@Argument clientLetter: ClientsLetters): ClientsLetters {
        return clientLetterRepository.insertLetter(clientLetter)
    }
}
