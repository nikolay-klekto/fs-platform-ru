package com.fs.client.repository

import com.fs.client.converter.CompanyModelConverter
import com.fs.client.repository.blocked.CompanyBlockingRepository
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.Company.Companion.COMPANY
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.Office.Companion.OFFICE
import com.fs.domain.jooq.tables.OrderDates.Companion.ORDER_DATES
import com.fs.domain.jooq.tables.ProfessionsCompaniesFeedback
import com.fs.domain.jooq.tables.ProfessionsCompaniesFeedback.Companion.PROFESSIONS_COMPANIES_FEEDBACK
import com.fs.domain.jooq.tables.pojos.Company
import com.fs.domain.jooq.tables.records.CompanyPartnerRecord
import com.fs.domain.jooq.tables.records.CompanyRecord
import com.fs.domain.jooq.tables.references.CITY
import com.fs.domain.jooq.tables.references.COMPANY_PARTNER
import com.fs.service.ru.CompanyModel
import com.fs.service.ru.enums.CompanyLegalCapacityStatus
import io.micrometer.core.annotation.Timed
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.impl.DSL

abstract class CompanyRepository(
    open val dsl: DSLContext,
    open val converter: CompanyModelConverter,
    open val companyBlockingRepository: CompanyBlockingRepository
) {

    suspend fun getCompanyById(id: Long): CompanyModel? =
        withContext(Dispatchers.IO) {
            companyBlockingRepository.getById(id)
        }

    suspend fun getAllCompaniesIndustries(): List<String> =
        withContext(Dispatchers.IO) {
            dsl.selectDistinct(COMPANY.COMPANY_INDUSTRY)
                .from(COMPANY)
                .map { it.into(String::class.java) }
        }

    @Timed(value = "companies.time", description = "Time taken to return all companies")
    open suspend fun getAllCompanies(): List<CompanyModel> =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY.asterisk()).from(COMPANY)
                .map { it.into(Company::class.java) }
                .map(converter::toModel)
        }

    open suspend fun getAllAvailableCompanies(): List<CompanyModel> =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY.asterisk()).from(COMPANY)
                .where(COMPANY.LEGAL_CAPACITY_STATUS.eq(CompanyLegalCapacityStatus.CAPABLE.name))
                .map { it.into(Company::class.java) }
                .map(converter::toModel)
        }

    suspend fun getAllCompaniesByProfessionId(professionId: Long): List<CompanyModel> =
        withContext(Dispatchers.IO) {
            dsl.select(
                COMPANY.asterisk(),
                DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).mul(5).`as`("price_per_week")
            )
                .from(COMPANY)
                .join(COMPANY_PROFESSION).on(COMPANY.ID.eq(COMPANY_PROFESSION.COMPANY_ID))
                .where(COMPANY_PROFESSION.PROFESSION_ID.eq(professionId))
                .groupBy(COMPANY.ID)
                .map { record ->
                    val company = record.into(Company::class.java)
                    val pricePerWeek = record.get("price_per_week", Double::class.java)
                    converter.toModel(company).apply {
                        this.pricePerWeek = pricePerWeek // предполагается, что `CompanyModel` имеет поле `pricePerWeek`
                    }
                }
        }

    suspend fun getAllCompaniesByCountryCode(countryCode: Long): List<CompanyModel> =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY.asterisk()).from(COMPANY)
                .where(
                    COMPANY.ID.`in`(
                        dsl.select(OFFICE.COMPANY_ID).from(OFFICE)
                            .where(
                                OFFICE.ADDRESS_ID.`in`(
                                    dsl.select(ADDRESS.ID).from(ADDRESS)
                                        .where(
                                            ADDRESS.CITY_ID.`in`(
                                                dsl.select(CITY.ID).from(CITY)
                                                    .where(CITY.COUNTRY_CODE.eq(countryCode))
                                            )
                                        )
                                )
                            )
                    )
                )
                .map { it.into(Company::class.java) }
                .map(converter::toModel)
        }

    suspend fun getAllCompaniesByCityId(cityId: Long): List<CompanyModel> =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY.asterisk()).from(COMPANY)
                .where(
                    COMPANY.ID.`in`(
                        dsl.select(OFFICE.COMPANY_ID).from(OFFICE)
                            .where(
                                OFFICE.ADDRESS_ID.`in`(
                                    dsl.select(ADDRESS.ID).from(ADDRESS)
                                        .where(ADDRESS.CITY_ID.eq(cityId))
                                )
                            )
                    )
                )
                .map { it.into(Company::class.java) }
                .map(converter::toModel)
        }

    suspend fun getAllCompanyStatusesForTable(): List<String> =
        withContext(Dispatchers.IO) {
            listOf(
                "Открыта",
                "Временно приостановлена",
                "Закрыта"
            )
        }

    suspend fun insertCompany(companyModel: CompanyModel): CompanyModel =
        withContext(Dispatchers.IO) {
            val newCompanyRecord: CompanyRecord = dsl.newRecord(COMPANY)
            newCompanyRecord.from(companyModel)
            newCompanyRecord.reset(COMPANY.ID)
            newCompanyRecord.store()
            newCompanyRecord.into(Company::class.java)
        }.let(converter::toModel)

    suspend fun insertCompanyByPartnerId(partnerId: Long, companyModel: CompanyModel): CompanyModel =
        withContext(Dispatchers.IO) {
            val newCompanyRecord: CompanyRecord = dsl.newRecord(COMPANY)
            newCompanyRecord.from(companyModel)
            newCompanyRecord.reset(COMPANY.ID)
            newCompanyRecord.store()

            val newPartnerCompanyRecord: CompanyPartnerRecord = dsl.newRecord(COMPANY_PARTNER)
            newPartnerCompanyRecord.partnerId = partnerId
            newPartnerCompanyRecord.companyId = newCompanyRecord.id
            dsl.insertInto(COMPANY_PARTNER)
                .set(newPartnerCompanyRecord)
                .execute()
            newCompanyRecord.into(Company::class.java)
        }.let(converter::toModel)

    suspend fun updateCompany(companyModel: CompanyModel): Boolean =
        withContext(Dispatchers.IO) {
            val oldCompanyModel: CompanyModel = companyBlockingRepository.getById(companyModel.id!!)!!

            val rowsUpdated = dsl.update(COMPANY)
                .set(
                    COMPANY.COMPANY_INDUSTRY,
                    DSL.value(
                        companyModel.companyIndustry ?: oldCompanyModel.companyIndustry
                    ) // Оборачиваем значение в DSL.value
                )
                .set(
                    COMPANY.LEGAL_CAPACITY_STATUS,
                    DSL.value(companyModel.legalCapacityStatus ?: oldCompanyModel.legalCapacityStatus)
                )
                .set(
                    COMPANY.NAME,
                    DSL.value(companyModel.name ?: oldCompanyModel.name)
                )
                .set(
                    COMPANY.SITE,
                    DSL.value(companyModel.site ?: oldCompanyModel.site)
                )
                .set(
                    COMPANY.SHORT_DESCRIPTION,
                    DSL.value(companyModel.shortDescription ?: oldCompanyModel.shortDescription)
                )
                .set(
                    COMPANY.WORK_TIME,
                    DSL.value(companyModel.workTime ?: oldCompanyModel.workTime)
                )
                .where(
                    COMPANY.ID.eq(DSL.value(companyModel.id)) // Оборачиваем ID в DSL.value
                )
                .execute()

            rowsUpdated == 1
        }

    suspend fun deleteCompany(companyId: Long): Boolean =
        withContext(Dispatchers.IO) {
            val result2 = dsl.deleteFrom(COMPANY_PARTNER)
                .where(COMPANY_PARTNER.COMPANY_ID.eq(companyId))
                .execute() > 0

            val result4 = dsl.deleteFrom(OFFICE)
                .where(OFFICE.COMPANY_ID.eq(companyId))
                .execute() > 0

            dsl.deleteFrom(PROFESSIONS_COMPANIES_FEEDBACK)
                .where(PROFESSIONS_COMPANIES_FEEDBACK.COMPANY_ID.eq(companyId))
                .execute()

            // Удаляем зависимые записи из order_dates
            dsl.deleteFrom(ORDER_DATES)
                .where(ORDER_DATES.COMPANY_PROFESSION_ID.`in`(
                    dsl.select(COMPANY_PROFESSION.ID)
                        .from(COMPANY_PROFESSION)
                        .where(COMPANY_PROFESSION.COMPANY_ID.eq(companyId))
                ))
                .execute()

            val result3 = dsl.deleteFrom(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.COMPANY_ID.eq(companyId))
                .execute() > 0

            val returnResult = dsl.deleteFrom(COMPANY)
                .where(COMPANY.ID.eq(companyId))
                .execute() == 1

            returnResult || result2 || result3 || result4
        }

}
