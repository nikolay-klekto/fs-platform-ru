package com.fs.payment

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
@EnableAuthorizationServer
@EnableResourceServer
@RestController
class WebsecurityappApplication {
    @get:RequestMapping(value = ["/products"])
    val productName: String
        get() = "Honey"

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(WebsecurityappApplication::class.java, *args)
        }
    }
}