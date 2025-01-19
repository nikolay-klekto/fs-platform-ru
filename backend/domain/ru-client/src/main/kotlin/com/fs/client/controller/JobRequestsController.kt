package com.fs.client.controller

import com.fs.client.repository.JobRequestsRepository
import com.fs.domain.jooq.tables.pojos.JobRequests
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class JobRequestsController(
    open val jobRequestsRepository: JobRequestsRepository
) {

    @MutationMapping
    fun insertJobRequest(@Argument jobRequests: JobRequests): Mono<JobRequests> {
        return jobRequestsRepository.insertJobRequest(jobRequests)
    }

}