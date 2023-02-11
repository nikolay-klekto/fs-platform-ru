//package com.fs.client.configuration
//
//import com.fasterxml.jackson.databind.ObjectMapper
//import com.fasterxml.jackson.databind.SerializationFeature
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
//import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//
//@Configuration
//open class JacksonConfig {
//
//    @Bean
//    open fun objectMapper(): ObjectMapper =
//        jacksonObjectMapper()
//            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
//            .registerModule(JavaTimeModule())
//}