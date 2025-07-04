package com.fs.client.repository

import com.fs.client.repository.blocked.InternshipTypeBlockingRepository
import com.fs.client.converter.InternshipTypeModelConverter
import com.fs.domain.jooq.tables.InternshipType.Companion.INTERNSHIP_TYPE
import com.fs.domain.jooq.tables.pojos.InternshipType
import com.fs.service.ru.InternshipTypeModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class InternshipTypeRepository(
    open val dsl: DSLContext,
    open val converter: InternshipTypeModelConverter,
    open val internshipTypeBlockingRepository: InternshipTypeBlockingRepository
) {

    suspend fun getInternshipTypeById(id: Long): InternshipTypeModel? =
        withContext(Dispatchers.IO) {
            internshipTypeBlockingRepository.getById(id)
        }

    suspend fun getAllInternshipTypes(): List<InternshipTypeModel> =
        withContext(Dispatchers.IO) {
            dsl.selectFrom(INTERNSHIP_TYPE)
                .map { it.into(InternshipType::class.java) }
                .map(converter::toModel)
        }

    suspend fun updateServiceById(id: Long, internshipTypeModel: InternshipTypeModel): Boolean =
        withContext(Dispatchers.IO) {
            dsl.update(INTERNSHIP_TYPE)
                .set(INTERNSHIP_TYPE.DESCRIPTION, internshipTypeModel.description)
                .set(INTERNSHIP_TYPE.NAME, internshipTypeModel.name)
                .where(INTERNSHIP_TYPE.ID.eq(id))
                .execute() == 1
        }

    suspend fun insert(internshipTypeModel: InternshipTypeModel): InternshipTypeModel =
        withContext(Dispatchers.IO) {
            val newInternshipTypeRecord = dsl.newRecord(INTERNSHIP_TYPE)
            newInternshipTypeRecord.from(internshipTypeModel)
            newInternshipTypeRecord.reset(INTERNSHIP_TYPE.ID)
            newInternshipTypeRecord.store()
            newInternshipTypeRecord.into(InternshipType::class.java)
        }.let(converter::toModel)

    suspend fun deleteByID(id: Long): Boolean =
        withContext(Dispatchers.IO) {
            dsl.deleteFrom(INTERNSHIP_TYPE)
                .where(INTERNSHIP_TYPE.ID.eq(id))
                .execute() == 1
        }
}
