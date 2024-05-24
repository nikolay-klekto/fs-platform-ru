package com.fs.client.config

import com.fs.client.component.LocalDateCoercing
import com.fs.client.component.LocalDateTimeCoercing
import graphql.schema.GraphQLScalarType
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GraphQLConfig {

    @Bean
    fun localDateTimeScalar(): GraphQLScalarType {
        return GraphQLScalarType.newScalar()
            .name("LocalDateTime")
            .description("Java 8 LocalDateTime")
            .coercing(LocalDateTimeCoercing())
            .build()
    }

    @Bean
    fun localDateScalar(): GraphQLScalarType {
        return GraphQLScalarType.newScalar()
            .name("LocalDate")
            .description("Java 8 LocalDate")
            .coercing(LocalDateCoercing())
            .build()
    }
}
