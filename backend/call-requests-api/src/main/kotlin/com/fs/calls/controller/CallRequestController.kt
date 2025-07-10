package com.fs.calls.controller

import com.fs.calls.jooq.tables.pojos.CallRequests
import com.fs.calls.repository.CallRequestRepository
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
open class CallRequestController(open val callRequestRepository: CallRequestRepository) {

    @MutationMapping
    fun insertCallRequest(@Argument callRequest: CallRequests): Mono<Boolean> {
        return callRequestRepository.insertCallRequest(callRequest)
    }

    @MutationMapping
    fun updateExpiredCallRequestsStatuses(): Mono<Boolean> {
        return callRequestRepository.updateExpiredCallRequestsStatuses()
    }
}