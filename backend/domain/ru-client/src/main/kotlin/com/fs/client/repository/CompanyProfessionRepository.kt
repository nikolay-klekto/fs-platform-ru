package com.fs.client.repository

import com.fs.client.converter.CompanyProfessionConverter
import com.fs.domain.jooq.tables.CompanyProfession.Companion.COMPANY_PROFESSION
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipPricesModel
import org.jooq.DSLContext
import org.jooq.impl.DSL
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class CompanyProfessionRepository(
    open val dsl: DSLContext,
    open val converter: CompanyProfessionConverter
) {

    fun getLowestPricesByInternshipTypes(): Flux<InternshipPricesModel> {
        return Flux.from(
            dsl.select(
                COMPANY_PROFESSION.INTERNSHIP_TYPE_ID,
                DSL.min(COMPANY_PROFESSION.PRICE_PER_DAY).`as`("price_per_day")
            )
                .from(COMPANY_PROFESSION)
                .groupBy(COMPANY_PROFESSION.INTERNSHIP_TYPE_ID)
        )
            .map {it.into(InternshipPricesModel::class.java)}
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

    fun getInternshipTypesAndPricesByCompanyProfessionId(
        companyId: Long,
        professionId: Long
    ): Flux<InternshipPricesModel>{
        return Flux.from(
            dsl.select(
                COMPANY_PROFESSION.INTERNSHIP_TYPE_ID,
                COMPANY_PROFESSION.PRICE_PER_DAY,
                COMPANY_PROFESSION.ID.`as`("company_profession_id")
                ).from(COMPANY_PROFESSION)
                .where(COMPANY_PROFESSION.PROFESSION_ID.eq(professionId)
                    .and(COMPANY_PROFESSION.COMPANY_ID.eq(companyId)))
        )
            .map {it.into(InternshipPricesModel::class.java)}
    }
}