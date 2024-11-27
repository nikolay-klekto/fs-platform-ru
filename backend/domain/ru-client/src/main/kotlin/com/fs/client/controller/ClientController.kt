package com.fs.client.controller

import com.fs.client.repository.ClientRepository
import com.fs.client.ru.ClientModel
import com.fs.client.ru.PartnerModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.lang.Error

@Tag(name = "Client")
@RestController
@RequestMapping("/client", produces = ["application/json"])
open class ClientController(open val clientRepository: ClientRepository) {

    @GetMapping("{id}")
    fun getClientById(@PathVariable("id") clientAccountId: String) =
        clientRepository.getClintById(clientAccountId)

    @GetMapping
    fun getAllClientModels() =
        clientRepository.getAllClients()

    @PutMapping("{id}")
    fun updateClientByID(
        @RequestBody clientModel: ClientModel
    ) = clientRepository
        .updateClientInfo(clientModel)

    @PutMapping("/status/{id}")
    fun updateClientActiveStatus(
        @RequestBody activeStatus: Boolean,
        @PathVariable("id") id: String
    ) = clientRepository
        .changeActiveStatus(id, activeStatus)

    @PutMapping("/password/{id}")
    fun updateClientPassword(
        @RequestBody password: String,
        @PathVariable("id") id: String
    ) = clientRepository
        .changePassword(id, password)

//    @PutMapping("/role/{id}")
//    fun updateClientRole(
//        @RequestBody role: ClientRoleModel,
//        @PathVariable("id") id: Long
//    ) = clientRepository
//        .changeRole(id, role)

//    @DeleteMapping("{id}")
//    fun deleteClientByID(
//        @PathVariable("id") id: Long
//    ) =
//        clientRepository.deleteClientById(id)

//    @PostMapping
//    open fun insertClientModel(
//        @RequestBody clientModel: ClientModel
//    ): Mono<ErrorModel<ClientModel>> {
//        return clientRepository.insertClient(clientModel)
//            .onErrorResume {
//                Mono.just(ErrorModel(null, it.message))
//            }
//    }

//    @MutationMapping
//    open fun verifyClientPassword(@Argument client: ClientModel): Mono<ErrorModel<Long>>{
//        return clientRepository.verifyPassword(client)
//            .onErrorResume {
//                Mono.just(ErrorModel(null, it.message))
//            }
//    }

    @QueryMapping
    open fun getClintById(@Argument id: String): Mono<ClientModel> {
        return clientRepository.getClintById(id)
    }

    @QueryMapping
    open fun getAllClients(): Flux<ClientModel> {
        return clientRepository.getAllClients()
    }

    @MutationMapping
    open fun updateClient(@Argument client: ClientModel): Mono<Boolean> {
        return clientRepository.updateClientInfo(client)
    }

    @MutationMapping
    open fun changePassword(
        @Argument clientId: String,
        @Argument password: String
    ): Mono<Boolean> {
        return clientRepository.changePassword(clientId, password)
    }


    //Should to think how to realize this function
//    @MutationMapping
//    open fun changeRole(
//        @Argument clientId: Long,
//        @Argument role: ClientRoleModel
//    ): Mono<Boolean> {
//        return clientRepository.changeRole(clientId, role)
//    }

    @MutationMapping
    open fun addClient(@Argument client: ClientModel): Mono<ErrorModel<ClientModel>> {
        return clientRepository.insertClient(client)
            .onErrorResume {
                return@onErrorResume Mono.just(ErrorModel(null, it.message))
            }
    }

    @MutationMapping
    open fun deleteClient(@Argument id: String): Mono<Boolean> {
        return clientRepository.deleteClientById(id)
    }

    @SchemaMapping(typeName = "Partner", field = "client")
    fun getClientForPartner(partner: PartnerModel): Mono<ClientModel> {
        return clientRepository.getClintById(partner.clientId)
    }
}