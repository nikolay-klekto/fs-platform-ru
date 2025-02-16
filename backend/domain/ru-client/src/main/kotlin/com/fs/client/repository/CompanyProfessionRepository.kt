package com.fs.client.repository

import com.fs.client.converter.CompanyProfessionConverter
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipPricesModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.impl.DSL

abstract class CompanyProfessionRepository(
    open val dsl: DSLContext,
    open val converter: CompanyProfessionConverter
) {

    suspend fun getLowestPricesByInternshipTypes(): List<InternshipPricesModel> =
        withContext(Dispatchers.IO) {
            dsl.select(
                COMPANY_PROFESSION.INTERNSHIP_TYPE_ID,
                DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).`as`("price_per_day")
            )
                .from(COMPANY_PROFESSION)
                .groupBy(COMPANY_PROFESSION.INTERNSHIP_TYPE_ID)
                .map { it.into(InternshipPricesModel::class.java) }
        }

    suspend fun getCompanyProfessionById(companyProfessionId: Long): CompanyProfessionModel? =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY_PROFESSION.asterisk())
                .from(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
                .fetchOne()
                ?.into(CompanyProfession::class.java)
                ?.let { converter.toModel(it) }
        }

    suspend fun getInternshipTypesAndPricesByCompanyProfessionId(
        companyId: Long,
        professionId: Long
    ): List<InternshipPricesModel> =
        withContext(Dispatchers.IO) {
            dsl.select(
                COMPANY_PROFESSION.INTERNSHIP_TYPE_ID,
                COMPANY_PROFESSION.PRICE_PER_DAY,
                COMPANY_PROFESSION.ID.`as`("company_profession_id")
            ).from(COMPANY_PROFESSION)
                .where(
                    COMPANY_PROFESSION.PROFESSION_ID.eq(professionId)
                        .and(COMPANY_PROFESSION.COMPANY_ID.eq(companyId))
                )
                .map { it.into(InternshipPricesModel::class.java) }
        }
}
