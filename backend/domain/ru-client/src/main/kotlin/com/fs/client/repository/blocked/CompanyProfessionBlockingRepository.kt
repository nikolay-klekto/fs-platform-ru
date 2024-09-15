package com.fs.client.repository.blocked

import com.fs.client.converter.CompanyProfessionConverter
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import org.jooq.DSLContext

abstract class CompanyProfessionBlockingRepository(
    private val dsl: DSLContext,
    private val companyProfessionConverter: CompanyProfessionConverter
) {

    fun getPricePerDayById(companyProfessionId: Long):Double{
        return dsl.select(COMPANY_PROFESSION.PRICE_PER_DAY)
            .from(COMPANY_PROFESSION)
            .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
            .first()
            .map { it.into(Double::class.java) }
    }

    fun getProfessionIdById(companyProfessionId: Long): Long{
        return dsl.select(COMPANY_PROFESSION.PROFESSION_ID)
            .from(COMPANY_PROFESSION)
            .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
            .first()
            .map { it.into(Long::class.java) }
    }
}