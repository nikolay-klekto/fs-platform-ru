package com.fs.client.repository

import com.fs.client.repository.blocked.InternshipTypeBlockingRepository
import com.fs.client.converter.InternshipTypeModelConverter
import com.fs.domain.jooq.tables.InternshipType.Companion.INTERNSHIP_TYPE
import com.fs.domain.jooq.tables.pojos.InternshipType
import com.fs.service.ru.InternshipTypeModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


abstract class InternshipTypeRepository(
    open val dsl: DSLContext,
    open val converter: InternshipTypeModelConverter,
    open val internshipTypeBlockingRepository: InternshipTypeBlockingRepository
) {

    fun getInternshipTypeById(id: Long): Mono<InternshipTypeModel> {
        return Mono.fromSupplier {
            internshipTypeBlockingRepository.getById(id)
        }
    }

    fun getAllInternshipTypes(): Flux<InternshipTypeModel> =
        Flux.from(
            dsl.selectFrom(INTERNSHIP_TYPE)
        )
            .map { it.into(InternshipType::class.java) }
            .map(converter::toModel)

    fun updateServiceById(id: Long, internshipTypeModel: InternshipTypeModel): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(INTERNSHIP_TYPE)
                .set(INTERNSHIP_TYPE.DESCRIPTION, internshipTypeModel.description)
                .set(INTERNSHIP_TYPE.NAME, internshipTypeModel.name)
                .where(INTERNSHIP_TYPE.ID.eq(id))
                .execute() == 1
        }
    }


    fun insert(internshipTypeModel: InternshipTypeModel) =
        Mono.fromSupplier {
            val newInternshipTypeRecord = dsl.newRecord(INTERNSHIP_TYPE)
            newInternshipTypeRecord.from(internshipTypeModel)
            newInternshipTypeRecord.reset(INTERNSHIP_TYPE.ID)
            newInternshipTypeRecord.store()
            return@fromSupplier newInternshipTypeRecord.into(InternshipType::class.java)
        }
            .map(converter::toModel)

    fun deleteByID(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(INTERNSHIP_TYPE)
                .where(INTERNSHIP_TYPE.ID.eq(id))
                .execute() == 1
        }
    }
}



