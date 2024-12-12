package com.fs.auth.repository.blocked

import com.fs.auth.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import org.jooq.DSLContext

abstract class CompanyProfessionBlockingRepository(
    open val dsl: DSLContext
) {

    fun getPricePerDayById(companyProfessionId: Long): Double {
        return dsl.select(COMPANY_PROFESSION.PRICE_PER_DAY)
            .from(COMPANY_PROFESSION)
            .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
            .first()
            .map { it.into(Double::class.java) }
    }
}