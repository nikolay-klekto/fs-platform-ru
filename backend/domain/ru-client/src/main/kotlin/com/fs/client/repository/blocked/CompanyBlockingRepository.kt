package com.fs.client.repository.blocked

import com.fs.client.converter.CompanyModelConverter
import com.fs.domain.jooq.tables.Company.Companion.COMPANY
import com.fs.domain.jooq.tables.pojos.Company
import com.fs.service.ru.CompanyModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class CompanyBlockingRepository(
    open val dsl: DSLContext,
    open val converter: CompanyModelConverter
) {
    suspend fun getById(companyId: Long): CompanyModel? =
        withContext(Dispatchers.IO) {
            dsl.select(COMPANY.asterisk()).from(COMPANY)
                .where(COMPANY.ID.eq(companyId))
                .map { it.into(Company::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }
}
