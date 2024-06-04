package com.fs.client

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
@EnableScheduling
open class ClientServiceApp : SpringBootServletInitializer() {
//    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
//        return builder.sources(ClientServiceApp::class.java)
//    }
    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(ClientServiceApp::class.java)
    }
}

fun main(args: Array<String>) {
    runApplication<ClientServiceApp>(*args)
}
