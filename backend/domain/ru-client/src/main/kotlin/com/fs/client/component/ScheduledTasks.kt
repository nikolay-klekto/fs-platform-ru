package com.fs.client.component

import com.fs.client.repository.EventRepository
import com.fs.client.repository.OrderRepository
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component


@Component
open class ScheduledTasks(
    open val orderRepository: OrderRepository,
    open val eventRepository: EventRepository
) {
    @Scheduled(cron = EXPIRED_STATUS_CRON_SCHEDULER)
    fun reportCurrentTime() {
        orderRepository.updateExpiredStatus()
        eventRepository.updateExpiredEventsStatus()

    }

    companion object {
        private const val EXPIRED_STATUS_CRON_SCHEDULER: String = "0 0 0 * * *"

    }
}