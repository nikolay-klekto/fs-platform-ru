package com.fs.client.repository

import com.fs.client.converter.CompanyProfessionConverter
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.service.ru.CompanyProfessionModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class CompanyProfessionRepository(
    private val dsl: DSLContext,
    private val converter: CompanyProfessionConverter
) {

    fun getLowestPriceByInternshipTypeId(id: Long): Mono<Double> {
        return Mono.fromSupplier {
            dsl.select(COMPANY_PROFESSION.PRICE_PER_DAY)
                .from(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.INTERNSHIP_TYPE_ID.eq(id))
                .min()
                .map { it.into(Double::class.java) * 5 }
        }
    }

    fun getCompanyProfessionById(companyProfessionId: Long): Mono<CompanyProfessionModel> {
        return Mono.fromSupplier {
            dsl.select(COMPANY_PROFESSION.asterisk())
                .from(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.ID.eq(companyProfessionId))
                .fetchOne()
                ?.into(CompanyProfession::class.java)
                ?.let { converter.toModel(it) }
        }
    }
}