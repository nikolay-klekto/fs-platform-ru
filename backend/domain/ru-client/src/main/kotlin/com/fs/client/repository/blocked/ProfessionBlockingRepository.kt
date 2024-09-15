package com.fs.client.repository.blocked

import com.fs.client.converter.ProfessionModelConverter
import com.fs.domain.jooq.tables.Profession.Companion.PROFESSION
import com.fs.domain.jooq.tables.pojos.Profession
import com.fs.service.ru.ProfessionModel
import org.jooq.DSLContext

abstract class ProfessionBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ProfessionModelConverter
) {
    fun getById(positionId: Long): ProfessionModel? {
        return dsl.select(PROFESSION.asterisk()).from(PROFESSION)
            .where(PROFESSION.ID.eq(positionId))
            .map { it.into(Profession::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    private fun getClientNumberById(professionId: Long): Int{
        return dsl.select(PROFESSION.CLIENTS_NUMBER)
            .from(PROFESSION)
            .where(PROFESSION.ID.eq(professionId))
            .fetchOne()
            ?.map { it.into(Int::class.java) } ?: 0
    }

    fun increaseClientsNumberByProfessionId(id: Long){

        val newClientNumber = getClientNumberById(id) + 1

        dsl.update(PROFESSION)
            .set(PROFESSION.CLIENTS_NUMBER, newClientNumber)
            .where(PROFESSION.ID.eq(id))
            .execute()
    }

}