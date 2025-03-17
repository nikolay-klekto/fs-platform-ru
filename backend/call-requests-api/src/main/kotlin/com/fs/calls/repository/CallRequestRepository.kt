package com.fs.calls.repository

import com.fs.calls.jooq.tables.pojos.CallRequests
import org.apache.logging.log4j.LogManager
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.r2dbc.core.DatabaseClient
import org.springframework.r2dbc.core.bind
import reactor.core.publisher.Mono
import java.time.LocalDateTime

abstract class CallRequestRepository(
    open val databaseClient: DatabaseClient,
    open val rabbitTemplate: RabbitTemplate
) {

    fun insertCallRequest(callRequest: CallRequests): Mono<Boolean> {
        val now = LocalDateTime.now()
        callRequest.dateCreated = now
        callRequest.isActive = ACTIVE_STATUS
        return databaseClient.sql(
            """
            INSERT INTO call_request.call_requests (name, phone_num, is_active, date_created, call_time) 
            VALUES (:name, :phoneNum, :isActive, :dateCreated, :callTime)
        """.trimIndent()
        )
            .bind("name", callRequest.name)
            .bind("phoneNum", callRequest.phoneNum)
            .bind("isActive", callRequest.isActive)
            .bind("dateCreated", now)
            .bind("callTime", callRequest.callTime)
            .fetch()
            .rowsUpdated()
            .map { it == 1L }
            .doOnSuccess { success ->
                if (success) {
                    rabbitTemplate.convertAndSend("call_requests_queue", callRequest)
                }
            }
    }

    fun updateExpiredCallRequestsStatuses(): Mono<Boolean> {
        log.info("Scheduler is working. Date and time is: " + LocalDateTime.now())
        val targetDate = LocalDateTime.now().minusDays(10)
        return databaseClient.sql("UPDATE call_request.call_requests SET is_active = :expiredStatus WHERE is_active = :activeStatus AND date_created <= :dateCreated")
            .bind("expiredStatus", EXPIRED_STATUS)
            .bind("activeStatus", ACTIVE_STATUS)
            .bind("dateCreated", targetDate)
            .fetch()
            .rowsUpdated()
            .map { it > 0 }
    }

    companion object {
        private val log = LogManager.getLogger(CallRequestRepository::class.java)
        private const val ACTIVE_STATUS: Boolean = true
        private const val EXPIRED_STATUS: Boolean = false
    }
}
