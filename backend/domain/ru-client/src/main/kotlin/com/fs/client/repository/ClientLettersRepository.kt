package com.fs.client.repository

import com.fs.domain.jooq.tables.ClientsLetters.Companion.CLIENTS_LETTERS
import com.fs.domain.jooq.tables.pojos.ClientsLetters
import com.fs.domain.jooq.tables.records.ClientsLettersRecord
import com.fs.service.ru.errors.ErrorModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono
import java.time.LocalDate

abstract class ClientLettersRepository(
    open val dsl: DSLContext
) {
    fun insertLetter(letterModel: ClientsLetters): Mono<ClientsLetters> {
        return Mono.fromSupplier {
            val newLetterRecord: ClientsLettersRecord = dsl.newRecord(CLIENTS_LETTERS)
            newLetterRecord.from(letterModel)
            newLetterRecord.dateCreated = LocalDate.now()
            newLetterRecord.reset(CLIENTS_LETTERS.ID)
            newLetterRecord.store()
            return@fromSupplier newLetterRecord.into(ClientsLetters::class.java)
        }
    }
}
