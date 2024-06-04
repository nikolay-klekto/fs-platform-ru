//package com.fs.client.component
//
//import graphql.language.StringValue
//import graphql.schema.Coercing
//import graphql.schema.GraphQLScalarType
//import org.springframework.stereotype.Component
//import java.time.LocalDateTime
//import java.time.format.DateTimeFormatter
//
//@Component
//class LocalDateTimeCoercing : Coercing<LocalDateTime, String> {
//
//    override fun serialize(dataFetcherResult: Any): String {
//        if (dataFetcherResult is LocalDateTime) {
//            return dataFetcherResult.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
//        }
//        throw IllegalArgumentException("Invalid LocalDateTime value")
//    }
//
//    override fun parseValue(input: Any): LocalDateTime {
//        if (input is String) {
//            return LocalDateTime.parse(input, DateTimeFormatter.ISO_LOCAL_DATE_TIME)
//        }
//        throw IllegalArgumentException("Invalid LocalDateTime input")
//    }
//
//    override fun parseLiteral(input: Any): LocalDateTime {
//        if (input is StringValue) {
//            return LocalDateTime.parse(input.value, DateTimeFormatter.ISO_LOCAL_DATE_TIME)
//        }
//        throw IllegalArgumentException("Invalid LocalDateTime literal")
//    }
//}
//
//    val localDateTimeScalar: GraphQLScalarType = GraphQLScalarType.newScalar()
//        .name("LocalDateTime")
//        .description("Java 8 LocalDateTime")
//        .coercing(LocalDateTimeCoercing())
//        .build()
//
