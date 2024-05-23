package com.fs.client.config
import org.jooq.DSLContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

    @Configuration
    class JooqConfig(@Autowired private val dslContext: DSLContext) {

        @Bean
        fun dslContext(): DSLContext {
            return dslContext
        }
    }
