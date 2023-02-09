package com.fs.client.repository

import com.fs.client.ru.ClientModel
import reactor.core.publisher.Mono

interface ClientRepository {

    fun getClintById(id: Int): Mono<ClientModel>

    fun clientById(id: Int): ClientModel

    fun updateClientInfo(id: Int): Mono<Long>

    fun createClient(clientModel: ClientModel): Mono<Long>

    fun deleteClient(id: Int): Mono<Long>
}