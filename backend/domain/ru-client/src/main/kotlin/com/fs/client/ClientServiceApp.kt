package com.fs.client

import org.springframework.boot.Banner
import org.springframework.boot.SpringApplication
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
}

fun main(args: Array<String>) {
    val app = SpringApplication(ClientServiceApp::class.java)
    app.setBannerMode(Banner.Mode.OFF)
    val defaultProperties = mapOf<String, Any>(
        "server.port" to (System.getenv("SERVER_PORT") ?: "8183"),
        "spring.datasource.url" to (System.getenv("SPRING_DATASOURCE_URL") ?: "jdbc:postgresql://your-database-url"),
        "spring.datasource.username" to (System.getenv("SPRING_DATASOURCE_USERNAME") ?: "your-database-username"),
        "spring.datasource.password" to (System.getenv("SPRING_DATASOURCE_PASSWORD") ?: "your-database-password")
    )
    app.setDefaultProperties(defaultProperties)
    app.run(*args)
}
