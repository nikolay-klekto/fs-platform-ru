package com.fs.client.repository.blocked

import com.fs.client.service.CompanyModelConverter
import com.fs.domain.jooq.tables.Company.Companion.COMPANY
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Company
import com.fs.service.ru.CompanyModel
import org.jooq.DSLContext

abstract class CompanyBlockingRepository(
    open val dsl: DSLContext,
    open val converter: CompanyModelConverter
) {
    fun getById(companyId: Long): CompanyModel? {
        return dsl.select(COMPANY.asterisk()).from(COMPANY)
            .where(COMPANY.ID.eq(companyId))
            .map { it.into(Company::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}