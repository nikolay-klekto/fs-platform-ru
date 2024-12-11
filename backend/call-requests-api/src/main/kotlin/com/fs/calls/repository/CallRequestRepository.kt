package com.fs.calls.repository

import com.fs.calls.jooq.tables.CallRequests.Companion.CALL_REQUESTS
import com.fs.calls.jooq.tables.pojos.CallRequests
import com.fs.calls.jooq.tables.records.CallRequestsRecord
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import reactor.core.publisher.Mono
import java.time.LocalDate
import java.time.LocalDateTime

abstract class CallRequestRepository(
    open val dsl: DSLContext
) {

    fun insertCallRequest(callRequest: CallRequests): Mono<Boolean> =
        Mono.fromSupplier {
            callRequest.dateCreated = LocalDateTime.now()
            callRequest.isActive = ACTIVE_STATUS
            val newCallRequestsRecord: CallRequestsRecord = dsl.newRecord(CALL_REQUESTS)
            newCallRequestsRecord.from(callRequest)
            newCallRequestsRecord.reset(CALL_REQUESTS.ID)
            return@fromSupplier newCallRequestsRecord.store() == 1
        }

    fun updateExpiredCallRequestsStatuses(): Mono<Boolean> {
        log.info("Scheduler is working. Date and time is: " + LocalDateTime.now())
        return Mono.fromSupplier {
            return@fromSupplier dsl.update(CALL_REQUESTS)
                .set(CALL_REQUESTS.IS_ACTIVE, EXPIRED_STATUS)
                .where(
                    CALL_REQUESTS.IS_ACTIVE.eq(ACTIVE_STATUS).and(
                        CALL_REQUESTS.DATE_CREATED.ge(LocalDateTime.now().plusDays(10))
                    )
                ).execute() > 0
        }
    }

    companion object {
        private val log = LogManager.getLogger(CallRequestRepository::class.java)
        private const val ACTIVE_STATUS: Boolean = true
        private const val EXPIRED_STATUS: Boolean = false

    }
}
