package com.fs.client.repository

import com.fs.domain.jooq.tables.JobRequests.Companion.JOB_REQUESTS
import com.fs.domain.jooq.tables.pojos.JobRequests
import com.fs.domain.jooq.tables.records.JobRequestsRecord
import org.jooq.DSLContext
import reactor.core.publisher.Mono
import java.time.LocalDate

abstract class JobRequestsRepository(
    open val dsl: DSLContext
) {
    fun insertJobRequest(requestModel: JobRequests): Mono<JobRequests> {
        return Mono.fromSupplier {
            val newJobRequest: JobRequestsRecord = dsl.newRecord(JOB_REQUESTS)
            newJobRequest.from(requestModel)
            newJobRequest.dateCreated = LocalDate.now()
            newJobRequest.reset(JOB_REQUESTS.ID)
            newJobRequest.store()
            return@fromSupplier newJobRequest.into(JobRequests::class.java)
        }
    }
}
