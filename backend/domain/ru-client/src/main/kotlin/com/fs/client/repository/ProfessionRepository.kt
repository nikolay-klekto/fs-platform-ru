package com.fs.client.repository

import com.fs.client.converter.ProfessionModelConverter
import com.fs.client.repository.blocked.ProfessionBlockingRepository
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.OrderDates
import com.fs.domain.jooq.tables.OrderDates.Companion.ORDER_DATES
import com.fs.domain.jooq.tables.Profession.Companion.PROFESSION
import com.fs.domain.jooq.tables.ProfessionsCompaniesFeedback.Companion.PROFESSIONS_COMPANIES_FEEDBACK
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.domain.jooq.tables.pojos.Profession
import com.fs.domain.jooq.tables.records.CompanyProfessionRecord
import com.fs.domain.jooq.tables.records.ProfessionRecord
import com.fs.service.ru.ProfessionModel
import com.fs.service.ru.ProfessionWithInternshipTypeModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.impl.DSL

abstract class ProfessionRepository(
    open val dsl: DSLContext,
    open val converter: ProfessionModelConverter,
    open val professionBlockingRepository: ProfessionBlockingRepository
) {

    suspend fun getProfessionById(id: Long): ProfessionModel? =
        withContext(Dispatchers.IO) {
            professionBlockingRepository.getById(id)
        }

    suspend fun getAllProfessionsByCompanyId(companyId: Long): List<ProfessionModel> =
        withContext(Dispatchers.IO) {
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .where(
                    PROFESSION.ID.`in`(
                        dsl.select(COMPANY_PROFESSION.PROFESSION_ID).from(COMPANY_PROFESSION)
                            .where(COMPANY_PROFESSION.COMPANY_ID.eq(companyId))
                    )
                ).map { it.into(Profession::class.java) }
                .map(converter::toModel)
        }

    suspend fun getAllProfessions(): List<ProfessionModel> =
        withContext(Dispatchers.IO) {
            dsl.select(PROFESSION.asterisk()).from(PROFESSION)
                .orderBy(PROFESSION.CLIENTS_NUMBER.desc())
                .map { it.into(Profession::class.java) }
                .map(converter::toModel)
        }

    suspend fun getAllProfessionsCategories(): List<String> =
        withContext(Dispatchers.IO) {
            dsl.selectDistinct(PROFESSION.PROFESSION_INDUSTRY).from(PROFESSION)
                .map { it.into(String::class.java) }
        }

    suspend fun getAllProfessionsCategoriesForTable(): List<String> =
        withContext(Dispatchers.IO) {
            listOf(
                "Экономика и бизнес",
                "Наука и технологии",
                "Образование и культура",
                "Государственное управление и право",
                "Здравоохранение и медицина",
                "Экология и сельское хозяйство",
                "Другое"
            )
        }

    suspend fun getAllExistingProfessions(): List<ProfessionWithInternshipTypeModel> =
        withContext(Dispatchers.IO) {
            dsl.select()
                .from(
                    dsl.select(
                        PROFESSION.ID,
                        PROFESSION.NAME,
                        PROFESSION.DESCRIPTION,
                        PROFESSION.CLIENTS_NUMBER,
                        PROFESSION.PROFESSION_INDUSTRY,
                        DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5).`as`("price_per_week"),
                        DSL.groupConcatDistinct(COMPANY_PROFESSION.INTERNSHIP_TYPE_ID.cast(String::class.java))
                            .separator(",")
                            .`as`("internship_types"),
                        DSL.rowNumber()
                            .over(
                                DSL.partitionBy(PROFESSION.NAME)
                                    .orderBy(DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5).asc())
                            ).`as`("row_number")
                    )
                        .from(PROFESSION)
                        .leftJoin(COMPANY_PROFESSION)
                        .on(PROFESSION.ID.eq(COMPANY_PROFESSION.PROFESSION_ID))
                        .groupBy(
                            PROFESSION.ID,
                            PROFESSION.NAME,
                            PROFESSION.DESCRIPTION,
                            PROFESSION.CLIENTS_NUMBER,
                            PROFESSION.PROFESSION_INDUSTRY
                        )
                )
                .where(DSL.field("row_number").eq(1))
                .orderBy(DSL.field("clients_number").desc())
                .map { record ->
                    ProfessionWithInternshipTypeModel(
                        id = record.get(PROFESSION.ID),
                        name = record.get(PROFESSION.NAME),
                        description = record.get(PROFESSION.DESCRIPTION),
                        clientsNumber = record.get(PROFESSION.CLIENTS_NUMBER),
                        professionIndustry = record.get(PROFESSION.PROFESSION_INDUSTRY),
                        pricePerWeek = record.get("price_per_week", Double::class.java),
                        internshipTypeId = record.get("internship_types", String::class.java)
                    )
                }
        }


    suspend fun getAllProfessionsByInternshipType(internshipTypeId: Long): List<ProfessionModel> =
        withContext(Dispatchers.IO) {
            dsl.select()
                .from(
                    dsl.select(
                        PROFESSION.ID,
                        PROFESSION.NAME,
                        PROFESSION.DESCRIPTION,
                        PROFESSION.CLIENTS_NUMBER,
                        PROFESSION.PROFESSION_INDUSTRY,
                        (DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5)).`as`("price_per_week"),
                        DSL.rowNumber()
                            .over(
                                DSL.partitionBy(PROFESSION.NAME)
                                    .orderBy(DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5).asc())
                            ).`as`("row_number")
                    )
                        .from(PROFESSION)
                        .leftJoin(COMPANY_PROFESSION)
                        .on(PROFESSION.ID.eq(COMPANY_PROFESSION.PROFESSION_ID))
                        .where(COMPANY_PROFESSION.INTERNSHIP_TYPE_ID.eq(internshipTypeId))
                        .groupBy(
                            PROFESSION.ID,
                            PROFESSION.NAME,
                            PROFESSION.DESCRIPTION,
                            PROFESSION.CLIENTS_NUMBER,
                            PROFESSION.PROFESSION_INDUSTRY
                        )
                )
                .where(DSL.field("row_number").eq(1))
                .orderBy(DSL.field("clients_number").desc())
                .map { record ->
                    ProfessionModel(
                        id = record.get(PROFESSION.ID),
                        name = record.get(PROFESSION.NAME),
                        description = record.get(PROFESSION.DESCRIPTION),
                        clientsNumber = record.get(PROFESSION.CLIENTS_NUMBER),
                        professionIndustry = record.get(PROFESSION.PROFESSION_INDUSTRY),
                        pricePerWeek = record.get("price_per_week", Double::class.java)
                    )
                }
        }


    suspend fun getNMostPopularProfessions(quantity: Int): List<ProfessionModel> =
        withContext(Dispatchers.IO) {
            dsl.select()
                .from(
                    dsl.select(
                        PROFESSION.ID,
                        PROFESSION.NAME,
                        PROFESSION.DESCRIPTION,
                        PROFESSION.CLIENTS_NUMBER,
                        PROFESSION.PROFESSION_INDUSTRY,
                        (DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5)).`as`("price_per_week"),
                        DSL.rowNumber()
                            .over(
                                DSL.partitionBy(PROFESSION.NAME)
                                    .orderBy(DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5).asc())
                            ).`as`("row_number")
                    )
                        .from(PROFESSION)
                        .leftJoin(COMPANY_PROFESSION)
                        .on(PROFESSION.ID.eq(COMPANY_PROFESSION.PROFESSION_ID))
                        .groupBy(
                            PROFESSION.ID,
                            PROFESSION.NAME,
                            PROFESSION.DESCRIPTION,
                            PROFESSION.CLIENTS_NUMBER,
                            PROFESSION.PROFESSION_INDUSTRY
                        )
                )
                .where(DSL.field("row_number").eq(1))
                .orderBy(DSL.field("clients_number").desc())
                .limit(quantity)
                .map { record ->
                    ProfessionModel(
                        id = record.get(PROFESSION.ID),
                        name = record.get(PROFESSION.NAME),
                        description = record.get(PROFESSION.DESCRIPTION),
                        clientsNumber = record.get(PROFESSION.CLIENTS_NUMBER),
                        professionIndustry = record.get(PROFESSION.PROFESSION_INDUSTRY),
                        pricePerWeek = record.get("price_per_week", Double::class.java)
                    )
                }
        }

    suspend fun insertProfession(professionModel: ProfessionModel): ProfessionModel =
        withContext(Dispatchers.IO) {
            val newProfessionRecord: ProfessionRecord = dsl.newRecord(PROFESSION)
            newProfessionRecord.from(professionModel)
            newProfessionRecord.reset(PROFESSION.ID)
            newProfessionRecord.store()
            newProfessionRecord.into(Profession::class.java)
        }.let(converter::toModel)

    suspend fun initCompanyProfession(
        companyProfession: CompanyProfession,
        professionModel: ProfessionModel
    ): ProfessionModel =
        withContext(Dispatchers.IO) {
            val newProfessionRecord = dsl.newRecord(PROFESSION)
            newProfessionRecord.from(professionModel)
            newProfessionRecord.reset(PROFESSION.ID)
            newProfessionRecord.store()

            val newCompaniesProfessionRecord: CompanyProfessionRecord = dsl.newRecord(COMPANY_PROFESSION)
            companyProfession.professionId = newProfessionRecord.id
            newCompaniesProfessionRecord.from(companyProfession)
            newCompaniesProfessionRecord.reset(COMPANY_PROFESSION.ID)
            newCompaniesProfessionRecord.store()

            newProfessionRecord.into(Profession::class.java)
        }.let(converter::toModel)

    suspend fun initExistingProfessionToCompany(companyProfession: CompanyProfession): Boolean =
        withContext(Dispatchers.IO) {
            val newCompaniesProfessionRecord = dsl.newRecord(COMPANY_PROFESSION)
            newCompaniesProfessionRecord.from(companyProfession)
            newCompaniesProfessionRecord.reset(COMPANY_PROFESSION.ID)
            dsl.insertInto(COMPANY_PROFESSION)
                .set(newCompaniesProfessionRecord)
                .execute() == 1
        }

    suspend fun updateProfession(professionModel: ProfessionModel): Boolean =
        withContext(Dispatchers.IO) {
            val oldProfessionModel = professionBlockingRepository.getById(professionModel.id!!)

            dsl.update(PROFESSION)
                .set(PROFESSION.DESCRIPTION, professionModel.description ?: oldProfessionModel?.description)
                .set(PROFESSION.NAME, professionModel.name ?: oldProfessionModel?.name)
                .set(PROFESSION.PROFESSION_INDUSTRY, professionModel.professionIndustry ?: oldProfessionModel?.professionIndustry)
                .set(PROFESSION.PROFESSION_INDUSTRY, professionModel.professionIndustry ?: oldProfessionModel?.professionIndustry)
                .where(PROFESSION.ID.eq(professionModel.id))
                .execute() == 1
        }

    suspend fun deleteProfession(professionId: Long): Boolean =
        withContext(Dispatchers.IO) {
            // Удаляем зависимые записи из order_dates
            dsl.deleteFrom(ORDER_DATES)
                .where(
                    ORDER_DATES.COMPANY_PROFESSION_ID.`in`(
                    dsl.select(COMPANY_PROFESSION.ID)
                        .from(COMPANY_PROFESSION)
                        .where(COMPANY_PROFESSION.PROFESSION_ID.eq(professionId))
                ))
                .execute()
            dsl.deleteFrom(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.PROFESSION_ID.eq(professionId))
                .execute()
            dsl.deleteFrom(PROFESSIONS_COMPANIES_FEEDBACK)
                .where(PROFESSIONS_COMPANIES_FEEDBACK.PROFESSION_ID.eq(professionId))
                .execute()
            dsl.deleteFrom(PROFESSION)
                .where(PROFESSION.ID.eq(professionId))
                .execute() == 1
        }
}