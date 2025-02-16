package com.fs.client.repository.blocked

import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class CompanyProfessionBlockingRepository(
    open val dsl: DSLContext,
) {

    suspend fun getPricePerDayById(companyProfessionId: Long): Double =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY_PROFESSION.PRICE_PER_DAY)
                .from(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
                .first()
                .map { it.into(Double::class.java) }
        }

    suspend fun getProfessionIdById(companyProfessionId: Long): Long =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY_PROFESSION.PROFESSION_ID)
                .from(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
                .first()
                .map { it.into(Long::class.java) }
        }
}
