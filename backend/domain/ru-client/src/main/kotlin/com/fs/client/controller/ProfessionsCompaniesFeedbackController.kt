package com.fs.client.controller

import com.fs.client.repository.JobRequestsRepository
import com.fs.client.repository.ProfessionsCompaniesFeedbackRepository
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.domain.jooq.tables.pojos.JobRequests
import com.fs.domain.jooq.tables.pojos.ProfessionsCompaniesFeedback
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class ProfessionsCompaniesFeedbackController(
    open val repository: ProfessionsCompaniesFeedbackRepository
) {

    @MutationMapping
    fun insertProfessionsCompaniesFeedback(@Argument professionsCompaniesFeedback: ProfessionsCompaniesFeedback): Mono<ProfessionsCompaniesFeedback> {
        return repository.insertProfessionsCompaniesFeedback(professionsCompaniesFeedback)
    }

    @QueryMapping
    open fun getFeedbackByCompanyId(@Argument companyId: Long): Flux<ProfessionsCompaniesFeedback> {
        return repository.getFeedbackByCompanyId(companyId)
    }

    @QueryMapping
    open fun getFeedbackByProfessionId(@Argument professionId: Long): Flux<ProfessionsCompaniesFeedback> {
        return repository.getFeedbackByProfessionId(professionId)
    }
}