package com.fs.client.repository

import com.fs.domain.jooq.tables.Constants.Companion.CONSTANTS
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class ConstantsRepository(
    open val dsl: DSLContext
){
    fun getDaysForPayOrder(): Mono<Int> {
        return Mono.fromSupplier {
            dsl.select(CONSTANTS.DAYS_FOR_PAY_ORDER).from(CONSTANTS)
                .first()
                .map { it.into(Int::class.java) }
        }
    }
}