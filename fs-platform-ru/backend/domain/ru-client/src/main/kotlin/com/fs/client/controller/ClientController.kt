package com.fs.client.controller

import com.fs.client.repository.ClientRepository
import com.fs.client.ru.ClientModel
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/client")
class ClientController(
    private val clientRepository: ClientRepository
) {

    @GetMapping("/{id}")
    fun getClientById(@PathVariable("id") clientAccountId: Int): Mono<ClientModel> {
        return clientRepository
            .getClintById(clientAccountId)
    }
}