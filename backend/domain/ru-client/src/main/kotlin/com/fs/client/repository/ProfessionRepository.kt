package com.fs.client.repository

import com.fs.client.repository.blocked.ProfessionBlockingRepository
import com.fs.client.converter.ProfessionModelConverter
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.Profession.Companion.PROFESSION
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.domain.jooq.tables.pojos.Profession
import com.fs.domain.jooq.tables.records.CompanyProfessionRecord
import com.fs.domain.jooq.tables.records.ProfessionRecord
import com.fs.service.ru.ProfessionModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class ProfessionRepository(
    open val dsl: DSLContext,
    open val converter: ProfessionModelConverter,
    open val professionBlockingRepository: ProfessionBlockingRepository
) {

    fun getProfessionById(id: Long): Mono<ProfessionModel> {
        return Mono.fromSupplier {
            professionBlockingRepository.getById(id)
        }
    }

    fun getAllProfessionsByCompanyId(companyId: Long): Flux<ProfessionModel> {
        return Flux.from(
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .where(
                    PROFESSION.ID.`in`(
                        dsl.select(COMPANY_PROFESSION.PROFESSION_ID).from(COMPANY_PROFESSION)
                            .where(COMPANY_PROFESSION.COMPANY_ID.eq(companyId))
                    )
                )

        ).map { it.into(Profession::class.java) }
            .map(converter::toModel)
    }

    fun getAllProfessions(): Flux<ProfessionModel> {
        return Flux.from(
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .orderBy(PROFESSION.CLIENTS_NUMBER.desc())
        ).map { it.into(Profession::class.java) }
            .map(converter::toModel)
    }

    fun getAllProfessionsCategories(): Flux<String> {
        return Flux.from(
            dsl.selectDistinct(PROFESSION.PROFESSION_INDUSTRY).from(PROFESSION)
        ).map { it.into(String::class.java) }
    }

    fun getAllExistingProfessions(): Flux<ProfessionModel> {
        return Flux.from(
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .where(PROFESSION.ID.eq(
                    dsl.selectDistinct(COMPANY_PROFESSION.PROFESSION_ID)
                        .from(COMPANY_PROFESSION)
                ))
                .orderBy(PROFESSION.CLIENTS_NUMBER.desc())
        ).map { it.into(Profession::class.java) }
            .map(converter::toModel)
    }

    fun getNMostPopularProfessions(quantity: Int): Flux<ProfessionModel> {
        return Flux.from(
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .orderBy(PROFESSION.CLIENTS_NUMBER.desc()) // Сортировка по полю clientsNumber по убыванию
                .limit(quantity) // Лимитируем количество записей
        ).map { it.into(Profession::class.java) }
            .map(converter::toModel)
    }

    fun insertProfession(professionModel: ProfessionModel): Mono<ProfessionModel> {
        return Mono.fromSupplier {
            val newProfessionRecord: ProfessionRecord = dsl.newRecord(PROFESSION)
            newProfessionRecord.from(professionModel)
            newProfessionRecord.reset(PROFESSION.ID)
            newProfessionRecord.store()
            return@fromSupplier newProfessionRecord.into(Profession::class.java)
        }
            .map(converter::toModel)
    }

    fun initCompanyProfession(companyProfession: CompanyProfession, professionModel: ProfessionModel): Mono<ProfessionModel> {
        return Mono.fromSupplier {
            val newProfessionRecord = dsl.newRecord(PROFESSION)
            newProfessionRecord.from(professionModel)
            newProfessionRecord.reset(PROFESSION.ID)
            newProfessionRecord.store()

            val newCompaniesProfessionRecord: CompanyProfessionRecord = dsl.newRecord(COMPANY_PROFESSION)
            newCompaniesProfessionRecord.professionId = newProfessionRecord.id
            newCompaniesProfessionRecord.companyId = companyProfession.companyId
            dsl.insertInto(COMPANY_PROFESSION)
                .set(newCompaniesProfessionRecord)
                .execute()

            return@fromSupplier newProfessionRecord.into(Profession::class.java)
        }
            .map(converter::toModel)
    }

    fun initExistingProfessionToCompany(companyProfession: CompanyProfession): Mono<Boolean> {
        return Mono.fromSupplier {
            val newCompaniesProfessionRecord = dsl.newRecord(COMPANY_PROFESSION)
            newCompaniesProfessionRecord.from(companyProfession)
            newCompaniesProfessionRecord.reset(COMPANY_PROFESSION.ID)
            dsl.insertInto(COMPANY_PROFESSION)
                .set(newCompaniesProfessionRecord)
                .execute() == 1
        }
    }

    fun updateProfession(professionModel: ProfessionModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldPosition = professionBlockingRepository.getById(professionModel.id!!)

            dsl.update(PROFESSION)
                .set(PROFESSION.DESCRIPTION, professionModel.description ?: oldPosition?.description)
                .set(PROFESSION.NAME, professionModel.name ?: oldPosition?.name)
                .set(PROFESSION.PROFESSION_INDUSTRY, professionModel.professionIndustry ?: oldPosition?.professionIndustry)
                .where(PROFESSION.ID.eq(professionModel.id))
                .execute() == 1
        }
    }

    fun deleteProfession(professionId: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.PROFESSION_ID.eq(professionId))
                .execute()
            dsl.deleteFrom(PROFESSION)
                .where(PROFESSION.ID.eq(professionId))
                .execute() == 1

        }
    }
}