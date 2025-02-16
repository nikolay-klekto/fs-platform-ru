package com.fs.client.repository

import com.fs.domain.jooq.tables.ProfessionsCompaniesFeedback.Companion.PROFESSIONS_COMPANIES_FEEDBACK
import com.fs.domain.jooq.tables.pojos.ProfessionsCompaniesFeedback
import com.fs.domain.jooq.tables.records.ProfessionsCompaniesFeedbackRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDate

abstract class ProfessionsCompaniesFeedbackRepository(
    open val dsl: DSLContext
) {

    suspend fun insertProfessionsCompaniesFeedback(professionsCompaniesFeedback: ProfessionsCompaniesFeedback): ProfessionsCompaniesFeedback =
        withContext(Dispatchers.IO) {
            val newFeedback: ProfessionsCompaniesFeedbackRecord = dsl.newRecord(PROFESSIONS_COMPANIES_FEEDBACK)
            newFeedback.from(professionsCompaniesFeedback)
            newFeedback.dateCreated = LocalDate.now()
            newFeedback.reset(PROFESSIONS_COMPANIES_FEEDBACK.ID)
            newFeedback.store()
            newFeedback.into(ProfessionsCompaniesFeedback::class.java)
        }

    suspend fun getFeedbackByCompanyId(companyId: Long): List<ProfessionsCompaniesFeedback> =
        withContext(Dispatchers.IO) {
            dsl.select(PROFESSIONS_COMPANIES_FEEDBACK.asterisk())
                .from(PROFESSIONS_COMPANIES_FEEDBACK)
                .where(PROFESSIONS_COMPANIES_FEEDBACK.COMPANY_ID.eq(companyId))
                .map { it.into(ProfessionsCompaniesFeedback::class.java) }
        }

    suspend fun getFeedbackByProfessionId(professionId: Long): List<ProfessionsCompaniesFeedback> =
        withContext(Dispatchers.IO) {
            dsl.select(PROFESSIONS_COMPANIES_FEEDBACK.asterisk())
                .from(PROFESSIONS_COMPANIES_FEEDBACK)
                .where(PROFESSIONS_COMPANIES_FEEDBACK.PROFESSION_ID.eq(professionId))
                .map { it.into(ProfessionsCompaniesFeedback::class.java) }
        }
}
