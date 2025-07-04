package com.fs.auth.repository.blocked

import com.fs.auth.jooq.tables.ClientsRefreshTokens.Companion.CLIENTS_REFRESH_TOKENS
import com.fs.auth.jooq.tables.pojos.ClientsRefreshTokens
import com.fs.auth.jooq.tables.records.ClientsRefreshTokensRecord
import org.jooq.DSLContext

abstract class RefreshTokenBlockingRepository(
    open val dsl: DSLContext
) {
    fun findByToken(token: String): ClientsRefreshTokens? {
        return dsl.select(CLIENTS_REFRESH_TOKENS.asterisk())
            .from(CLIENTS_REFRESH_TOKENS)
            .where(CLIENTS_REFRESH_TOKENS.TOKEN.eq(token))
            .firstOrNull()
            ?.map { it.into(ClientsRefreshTokens::class.java) }
    }

    fun deleteByToken(token: String): Boolean {
        return dsl.deleteFrom(CLIENTS_REFRESH_TOKENS)
            .where(CLIENTS_REFRESH_TOKENS.TOKEN.eq(token))
            .execute() == 1
    }

    fun insertToken(clientsRefreshTokens: ClientsRefreshTokens) {
        val newClientRefreshTokensRecord: ClientsRefreshTokensRecord = dsl.newRecord(CLIENTS_REFRESH_TOKENS)
        newClientRefreshTokensRecord.from(clientsRefreshTokens)
        newClientRefreshTokensRecord.reset(CLIENTS_REFRESH_TOKENS.ID)
        newClientRefreshTokensRecord.store()
    }
}