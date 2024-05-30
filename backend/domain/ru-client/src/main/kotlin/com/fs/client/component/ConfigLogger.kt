package com.fs.client.component

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import org.springframework.core.env.Environment

@Component
class ConfigLogger(val env: Environment) : CommandLineRunner {
    override fun run(vararg args: String?) {
        println("Server port: " + env.getProperty("server.port"))
        println("Database URL: " + env.getProperty("spring.datasource.url"))
    }
}