package com.fs.auth.repository.blocked

import com.fs.domain.jooq.tables.CompanyProfession
import org.jooq.DSLContext

abstract class CompanyProfessionBlockingRepository(
    open val dsl: DSLContext
) {

    fun getPricePerDayById(companyProfessionId: Long): Double {
        return dsl.select(CompanyProfession.COMPANY_PROFESSION.PRICE_PER_DAY)
            .from(CompanyProfession.COMPANY_PROFESSION)
            .where(CompanyProfession.COMPANY_PROFESSION.ID.eq(companyProfessionId))
            .first()
            .map { it.into(Double::class.java) }
    }
}