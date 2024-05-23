package com.fs.client.config

import io.micrometer.core.aop.TimedAspect
import io.micrometer.core.instrument.MeterRegistry
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MetricsConfig {

    @Autowired
    lateinit var registry: MeterRegistry

    @Bean
    fun timedAspect(): TimedAspect {
        return TimedAspect(registry)
    }
}

