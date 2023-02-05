package com.fs.client.repository

import com.fs.client.ru.ClientModel
import reactor.core.publisher.Mono

interface ClientRepository {

    fun getClintById(id: Long): Mono<ClientModel>

    fun updateClientInfo(id: Long): Mono<Long>

    fun createClient(clientModel: ClientModel): Mono<Long>

    fun deleteClient(id: Long): Mono<Long>
}