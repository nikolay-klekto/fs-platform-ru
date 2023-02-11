package com.fs.client.controller

import com.fs.client.repository.ClientRepository
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Client")
@RestController
@RequestMapping("/client", produces = ["application/json"])
open class ClientController(open val clientRepository: ClientRepository) {

    @GetMapping("{id}")
    fun getClientById(@PathVariable("id") clientAccountId: Int) =
        clientRepository.getClintById(clientAccountId)

//    @QueryMapping
//    fun clientById(@Argument id: Int): Mono<ClientModel> {
//        return clientRepository.getClintById(id)
//    }


}