package com.fs.client.repository.blocked

import com.fs.client.converter.ProfessionModelConverter
import com.fs.domain.jooq.tables.Profession.Companion.PROFESSION
import com.fs.domain.jooq.tables.pojos.Profession
import com.fs.service.ru.ProfessionModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class ProfessionBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ProfessionModelConverter
) {
    suspend fun getById(positionId: Long): ProfessionModel? =
        withContext(Dispatchers.IO) {
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .where(PROFESSION.ID.eq(positionId))
                .map { it.into(Profession::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    private suspend fun getClientNumberById(professionId: Long): Int =
        withContext(Dispatchers.IO) {
            dsl.select(PROFESSION.CLIENTS_NUMBER)
                .from(PROFESSION)
                .where(PROFESSION.ID.eq(professionId))
                .fetchOne()
                ?.map { it.into(Int::class.java) } ?: 0
        }

    suspend fun increaseClientsNumberByProfessionId(id: Long) {
        withContext(Dispatchers.IO) {
            val newClientNumber = getClientNumberById(id) + 1

            dsl.update(PROFESSION)
                .set(PROFESSION.CLIENTS_NUMBER, newClientNumber)
                .where(PROFESSION.ID.eq(id))
                .execute()
        }
    }
}
