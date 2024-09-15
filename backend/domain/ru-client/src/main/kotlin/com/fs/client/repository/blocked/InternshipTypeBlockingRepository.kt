package com.fs.client.repository.blocked

import com.fs.client.converter.InternshipTypeModelConverter
import com.fs.domain.jooq.tables.InternshipType.Companion.INTERNSHIP_TYPE
import com.fs.domain.jooq.tables.pojos.InternshipType
import com.fs.service.ru.InternshipTypeModel
import org.jooq.DSLContext

abstract class InternshipTypeBlockingRepository(
    open val dsl: DSLContext,
    open val converter: InternshipTypeModelConverter
) {

    fun getById(id: Long): InternshipTypeModel? {

        return dsl.select(INTERNSHIP_TYPE.asterisk())
            .from(INTERNSHIP_TYPE)
            .where(INTERNSHIP_TYPE.ID.eq(id))

            .map { it.into(InternshipType::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}