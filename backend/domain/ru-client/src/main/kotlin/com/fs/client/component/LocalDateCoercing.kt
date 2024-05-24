//package com.fs.client.component
//
//import graphql.language.StringValue
//import graphql.schema.Coercing
//import graphql.schema.GraphQLScalarType
//import org.springframework.stereotype.Component
//import java.time.LocalDate
//import java.time.format.DateTimeFormatter
//
//@Component
//class LocalDateCoercing : Coercing<LocalDate, String> {
//
//    override fun serialize(dataFetcherResult: Any): String {
//        if (dataFetcherResult is LocalDate) {
//            return dataFetcherResult.format(DateTimeFormatter.ISO_LOCAL_DATE)
//        }
//        throw IllegalArgumentException("Invalid LocalDate value")
//    }
//
//    override fun parseValue(input: Any): LocalDate {
//        if (input is String) {
//            return LocalDate.parse(input, DateTimeFormatter.ISO_LOCAL_DATE)
//        }
//        throw IllegalArgumentException("Invalid LocalDate input")
//    }
//
//    override fun parseLiteral(input: Any): LocalDate {
//        if (input is StringValue) {
//            return LocalDate.parse(input.value, DateTimeFormatter.ISO_LOCAL_DATE)
//        }
//        throw IllegalArgumentException("Invalid LocalDate literal")
//    }
//}
//
//val localDateScalar: GraphQLScalarType = GraphQLScalarType.newScalar()
//    .name("LocalDate")
//    .description("Java 8 LocalDate")
//    .coercing(LocalDateCoercing())
//    .build()
//
