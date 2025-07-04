package com.fs.auth.repository.blocked

import com.fs.auth.jooq.tables.Client.Companion.CLIENT
import com.fs.client.ru.ClientModel
import org.jooq.DSLContext

abstract class UserBlockingRepository(
    open val dsl: DSLContext
) {

    fun getByEmail(clientEmail: String): ClientModel? {
        return dsl.selectFrom(CLIENT).where(CLIENT.EMAIL.eq(clientEmail))
            .map { it.into(ClientModel::class.java) }
            .firstOrNull()
    }

    fun getById(clientId: String?): ClientModel? {
        return dsl.select(CLIENT.asterisk()).from(CLIENT)
            .where(CLIENT.ID.eq(clientId))
            .map { it.into(ClientModel::class.java) }
            .firstOrNull()
    }
}