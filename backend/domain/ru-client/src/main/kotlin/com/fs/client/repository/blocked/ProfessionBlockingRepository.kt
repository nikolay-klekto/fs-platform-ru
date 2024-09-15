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
}