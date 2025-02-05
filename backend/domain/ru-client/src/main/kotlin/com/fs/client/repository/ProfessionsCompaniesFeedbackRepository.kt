package com.fs.client.repository

import com.fs.domain.jooq.tables.ProfessionsCompaniesFeedback.Companion.PROFESSIONS_COMPANIES_FEEDBACK
import com.fs.domain.jooq.tables.pojos.ProfessionsCompaniesFeedback
import com.fs.domain.jooq.tables.records.ProfessionsCompaniesFeedbackRecord
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDate

abstract class ProfessionsCompaniesFeedbackRepository(
    open val dsl: DSLContext
) {
    fun insertProfessionsCompaniesFeedback(professionsCompaniesFeedback: ProfessionsCompaniesFeedback): Mono<ProfessionsCompaniesFeedback> {
        return Mono.fromSupplier {
            val newFeedback: ProfessionsCompaniesFeedbackRecord = dsl.newRecord(PROFESSIONS_COMPANIES_FEEDBACK)
            newFeedback.from(professionsCompaniesFeedback)
            newFeedback.dateCreated = LocalDate.now()
            newFeedback.reset(PROFESSIONS_COMPANIES_FEEDBACK.ID)
            newFeedback.store()
            return@fromSupplier newFeedback.into(ProfessionsCompaniesFeedback::class.java)
        }
    }

    fun getFeedbackByCompanyId(companyId: Long): Flux<ProfessionsCompaniesFeedback>{
        return Flux.from(
            dsl.select(PROFESSIONS_COMPANIES_FEEDBACK.asterisk())
                .from(PROFESSIONS_COMPANIES_FEEDBACK)
                .where(PROFESSIONS_COMPANIES_FEEDBACK.COMPANY_ID.eq(companyId))
        )
            .map { it.into(ProfessionsCompaniesFeedback::class.java) }
    }

    fun getFeedbackByProfessionId(professionId: Long): Flux<ProfessionsCompaniesFeedback>{
        return Flux.from(
            dsl.select(PROFESSIONS_COMPANIES_FEEDBACK.asterisk())
                .from(PROFESSIONS_COMPANIES_FEEDBACK)
                .where(PROFESSIONS_COMPANIES_FEEDBACK.PROFESSION_ID.eq(professionId))
        )
            .map { it.into(ProfessionsCompaniesFeedback::class.java) }
    }
}
