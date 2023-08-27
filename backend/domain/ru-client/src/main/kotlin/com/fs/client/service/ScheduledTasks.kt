//package com.fs.client.service
//
//
//import com.fs.client.repository.OrderRepository
//import org.springframework.context.annotation.Bean
//import org.springframework.scheduling.annotation.Scheduled
//import org.springframework.stereotype.Service
//
//
//@Service
//open class ScheduledTasks(open val orderRepository: OrderRepository) {
//
//    @Bean
//    open fun orderRepository(): OrderRepository{
//        return OrderRepository()
//    }
//    @Scheduled(cron = EXPIRED_STATUS_CRON_SCHEDULER)
//    open fun reportCurrentTime() {
//        println("Hello from service!!!!!!!")
//        orderRepository.updateExpiredStatus()
//    }
//
//    companion object {
//        private const val EXPIRED_STATUS_CRON_SCHEDULER: String = "0 0 14 * * *"
//
//    }
//}