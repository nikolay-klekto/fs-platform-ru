package com.fs.client.controller

import com.fs.client.repository.ClientRepository
import com.fs.client.ru.AuthorizationClientModel
import com.fs.client.ru.ClientInputModel
import com.fs.client.ru.ClientModel
import com.fs.client.ru.PartnerModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*

@Tag(name = "Client")
@RestController
@RequestMapping("/client", produces = ["application/json"])
class ClientController(private val clientRepository: ClientRepository) {

    @QueryMapping
    suspend fun getClintById(@Argument id: String): ClientModel? {
        return clientRepository.getClintById(id)
    }

    @QueryMapping
    suspend fun getAllClients(): List<ClientModel> {
        return clientRepository.getAllClients()
    }

    @MutationMapping
    suspend fun updateClient(@Argument client: ClientInputModel): Boolean {
        return clientRepository.updateClientInfo(client)
    }

    @MutationMapping
    suspend fun changePassword(
        @Argument clientId: String,
        @Argument password: String
    ): Boolean {
        return clientRepository.changePassword(clientId, password)
    }

    @MutationMapping
    suspend fun verifyPassword(
        @Argument clientModel: AuthorizationClientModel
    ): ErrorModel<Boolean> {
        return try {
            clientRepository.verifyPassword(clientModel)
        } catch (e: Exception) {
            ErrorModel(null, e.message)
        }
    }

    @MutationMapping
    suspend fun deleteClient(@Argument id: String): Boolean {
        return clientRepository.deleteClientById(id)
    }

    @SchemaMapping(typeName = "Partner", field = "client")
    suspend fun getClientForPartner(partner: PartnerModel): ClientModel? {
        return clientRepository.getClintById(partner.clientId)
    }
}
