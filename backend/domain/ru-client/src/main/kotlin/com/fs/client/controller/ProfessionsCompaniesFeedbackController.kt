package com.fs.client.controller

import com.fs.client.repository.ProfessionsCompaniesFeedbackRepository
import com.fs.domain.jooq.tables.pojos.ProfessionsCompaniesFeedback
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ProfessionsCompaniesFeedbackController(
    private val repository: ProfessionsCompaniesFeedbackRepository
) {

    @MutationMapping
    suspend fun insertProfessionsCompaniesFeedback(@Argument professionsCompaniesFeedback: ProfessionsCompaniesFeedback): ProfessionsCompaniesFeedback {
        return repository.insertProfessionsCompaniesFeedback(professionsCompaniesFeedback)
    }

    @QueryMapping
    suspend fun getFeedbackByCompanyId(@Argument companyId: Long): List<ProfessionsCompaniesFeedback> {
        return repository.getFeedbackByCompanyId(companyId)
    }

    @QueryMapping
    suspend fun getFeedbackByProfessionId(@Argument professionId: Long): List<ProfessionsCompaniesFeedback> {
        return repository.getFeedbackByProfessionId(professionId)
    }
}
