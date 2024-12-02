package com.fs.auth.repository.blocked

import com.fs.client.ru.ClientModel
import com.fs.domain.jooq.tables.Client
import org.jooq.DSLContext

abstract class UserBlockingRepository(
    open val dsl: DSLContext
) {

    fun getByEmail(clientEmail: String): ClientModel? {
        return dsl.selectFrom(Client.CLIENT).where(Client.CLIENT.EMAIL.eq(clientEmail))
            .map { it.into(ClientModel::class.java) }
            .firstOrNull()
    }

    fun getById(clientId: String?): ClientModel? {
        return dsl.select(Client.CLIENT.asterisk()).from(Client.CLIENT)
            .where(Client.CLIENT.ID.eq(clientId))
            .map { it.into(ClientModel::class.java) }
            .firstOrNull()
    }
}