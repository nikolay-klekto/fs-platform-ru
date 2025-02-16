package com.fs.client.repository

import com.fs.domain.jooq.tables.Constants.Companion.CONSTANTS
import com.fs.domain.jooq.tables.pojos.Constants
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class ConstantsRepository(
    open val dsl: DSLContext
){
    suspend fun getDaysForPayOrder(): Int =
        withContext(Dispatchers.IO) {
            dsl.select(CONSTANTS.DAYS_FOR_PAY_ORDER).from(CONSTANTS)
                .first()
                .map { it.into(Int::class.java) }
        }

    suspend fun getInfoForContactPage(): Constants =
        withContext(Dispatchers.IO) {
            dsl.select(CONSTANTS.asterisk()).from(CONSTANTS)
                .first()
                .map { it.into(Constants::class.java) }
        }
}
