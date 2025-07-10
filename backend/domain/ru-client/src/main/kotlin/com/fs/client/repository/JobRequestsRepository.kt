package com.fs.client.repository

import com.fs.domain.jooq.tables.JobRequests.Companion.JOB_REQUESTS
import com.fs.domain.jooq.tables.pojos.JobRequests
import com.fs.domain.jooq.tables.records.JobRequestsRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDate

abstract class JobRequestsRepository(
    open val dsl: DSLContext
) {
    suspend fun insertJobRequest(requestModel: JobRequests): JobRequests =
        withContext(Dispatchers.IO) {
            val newJobRequest: JobRequestsRecord = dsl.newRecord(JOB_REQUESTS)
            newJobRequest.from(requestModel)
            newJobRequest.dateCreated = LocalDate.now()
            newJobRequest.reset(JOB_REQUESTS.ID)
            newJobRequest.store()
            newJobRequest.into(JobRequests::class.java)
        }
}
