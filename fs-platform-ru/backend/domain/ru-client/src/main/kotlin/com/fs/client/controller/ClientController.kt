package com.fs.client.controller

import com.fs.client.repository.ClientRepository
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "Client")
@RestController
@RequestMapping("/client", produces = ["application/json"])
open class ClientController(open val clientRepository: ClientRepository) {

    @GetMapping("{id}")
    fun getClientById(@PathVariable("id") clientAccountId: Int) =
        clientRepository.getClintById(clientAccountId)

    @GetMapping
    fun getAllClients() =
        clientRepository.getAllClients()

    @PutMapping("{id}")
    fun updateClientByID(
        @RequestBody clientModel: ClientModel,
        @PathVariable("id") id: Int
    ) = clientRepository
        .updateClientInfo(id, clientModel)

    @PutMapping("/status/{id}")
    fun updateClientActiveStatus(
        @RequestBody activeStatus: Boolean,
        @PathVariable("id") id: Int
    ) = clientRepository
        .changeActiveStatus(id, activeStatus)

    @PutMapping("/password/{id}")
    fun updateClientPassword(
        @RequestBody password: String,
        @PathVariable("id") id: Int
    ) = clientRepository
        .changePassword(id, password)

    @PutMapping("/role/{id}")
    fun updateClientRole(
        @RequestBody role: ClientRoleModel,
        @PathVariable("id") id: Int
    ) = clientRepository
        .changeRole(id, role)

    @DeleteMapping("{id}")
    fun deleteClientByID(
        @PathVariable("id") id: Int
    ) =
        clientRepository.delete(id)

    @PostMapping
    fun insertClientModel(
        @RequestBody clientModel: ClientModel
    ) =
        clientRepository.insert(clientModel)

//    @QueryMapping
//    open fun clientById(@Argument id: Int): Mono<ClientModel> {
//        return clientRepository.getClintById(id)
//    }

}