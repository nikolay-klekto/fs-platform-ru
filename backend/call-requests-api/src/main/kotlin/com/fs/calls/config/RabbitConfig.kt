package com.fs.calls.config

import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitConfig {
    @Bean
    fun callRequestQueue(): Queue {
        return Queue("call_requests_queue")
    }
}
