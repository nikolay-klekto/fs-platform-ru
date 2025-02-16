package com.fs.client.controller

import com.fs.client.repository.JobRequestsRepository
import com.fs.domain.jooq.tables.pojos.JobRequests
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class JobRequestsController(
    private val jobRequestsRepository: JobRequestsRepository
) {

    @MutationMapping
    suspend fun insertJobRequest(@Argument jobRequests: JobRequests): JobRequests {
        return jobRequestsRepository.insertJobRequest(jobRequests)
    }
}
