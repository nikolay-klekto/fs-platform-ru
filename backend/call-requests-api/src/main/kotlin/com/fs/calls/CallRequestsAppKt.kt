package com.fs.calls

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.transaction.annotation.EnableTransactionManagement

@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties
open class CallRequestsAppKt : SpringBootServletInitializer() {

    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(CallRequestsAppKt::class.java)
    }
}

fun main(args: Array<String>) {
    runApplication<CallRequestsAppKt>(*args)
}
