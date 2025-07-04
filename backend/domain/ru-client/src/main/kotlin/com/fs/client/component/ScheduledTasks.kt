package com.fs.client.component

import com.fs.client.repository.EventRepository
import com.fs.client.repository.OrderRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
open class ScheduledTasks(
    private val orderRepository: OrderRepository,
    private val eventRepository: EventRepository
) {
    private val scope = CoroutineScope(Dispatchers.IO)

    @Scheduled(cron = EXPIRED_STATUS_CRON_SCHEDULER)
    fun reportCurrentTime() {
        scope.launch {
            orderRepository.updateExpiredStatus()
            eventRepository.updateExpiredEventsStatus()
        }
    }

    companion object {
        private const val EXPIRED_STATUS_CRON_SCHEDULER: String = "0 0 0 * * *"
    }
}
