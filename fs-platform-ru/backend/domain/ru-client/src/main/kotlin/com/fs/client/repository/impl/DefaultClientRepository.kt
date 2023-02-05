package com.fs.client.repository.impl

import com.fs.client.repository.ClientRepository
import com.fs.client.ru.ClientModel
import com.fs.client.service.ClientModelConverter
import org.jooq.DSLContext
import reactor.core.publisher.Mono

class DefaultClientRepository(
    private val dslContext: DSLContext,
    private val converter: ClientModelConverter
) : ClientRepository {

    override fun getClintById(id: Long): Mono<ClientModel> {
        TODO("Not yet implemented")

//        return Mono.from(
//
//        )
    }

    override fun updateClientInfo(id: Long): Mono<Long> {
        TODO("Not yet implemented")
    }

    override fun createClient(clientModel: ClientModel): Mono<Long> {
        TODO("Not yet implemented")
    }

    override fun deleteClient(id: Long): Mono<Long> {
        TODO("Not yet implemented")
    }
}