package com.fs.calls.component

import com.fs.calls.repository.CallRequestRepository
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
open class ScheduledTasks(
    open val callRequestRepository: CallRequestRepository
) {
    @Scheduled(cron = EXPIRED_STATUS_CRON_SCHEDULER)
    fun reportCurrentTime() {
        callRequestRepository.updateExpiredCallRequestsStatuses()
    }

    companion object {
        private const val EXPIRED_STATUS_CRON_SCHEDULER: String = "0 0 0 * * *"

    }
}