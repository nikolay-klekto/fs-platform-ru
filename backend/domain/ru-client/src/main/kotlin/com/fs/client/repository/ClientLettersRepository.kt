package com.fs.client.repository

import com.fs.domain.jooq.tables.ClientsLetters.Companion.CLIENTS_LETTERS
import com.fs.domain.jooq.tables.pojos.ClientsLetters
import com.fs.domain.jooq.tables.records.ClientsLettersRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDate

abstract class ClientLettersRepository(
    open val dsl: DSLContext
) {
    suspend fun insertLetter(letterModel: ClientsLetters): ClientsLetters =
        withContext(Dispatchers.IO) {
            val newLetterRecord: ClientsLettersRecord = dsl.newRecord(CLIENTS_LETTERS)
            newLetterRecord.from(letterModel)
            newLetterRecord.dateCreated = LocalDate.now()
            newLetterRecord.reset(CLIENTS_LETTERS.ID)
            newLetterRecord.store()
            newLetterRecord.into(ClientsLetters::class.java)
        }
}
