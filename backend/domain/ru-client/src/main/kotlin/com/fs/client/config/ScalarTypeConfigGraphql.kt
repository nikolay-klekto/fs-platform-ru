//package com.fs.client.config
//
//import graphql.schema.Coercing
//import graphql.schema.CoercingSerializeException
//import graphql.schema.GraphQLScalarType
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.graphql.execution.RuntimeWiringConfigurer
//import java.time.LocalDate
//import java.time.LocalDateTime
//import java.time.format.DateTimeFormatter
//
//class LocalDateCoercing : Coercing<LocalDate, String> {
//    override fun serialize(dataFetcherResult: Any): String {
//        if (dataFetcherResult is LocalDate) {
//            return dataFetcherResult.toString()
//        }
//        throw CoercingSerializeException("Expected a LocalDate object.")
//    }
//
//    override fun parseValue(input: Any): LocalDate {
//        return LocalDate.parse(input.toString())
//    }
//
//    override fun parseLiteral(input: Any): LocalDate {
//        return LocalDate.parse(input.toString())
//    }
//}
//
//class LocalDateTimeCoercing : Coercing<LocalDateTime, String> {
//    private val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")
//
//    override fun serialize(dataFetcherResult: Any): String {
//        if (dataFetcherResult is LocalDateTime) {
//            return dataFetcherResult.format(formatter)
//        }
//        throw CoercingSerializeException("Expected a LocalDateTime object.")
//    }
//
//    override fun parseValue(input: Any): LocalDateTime {
//        return LocalDateTime.parse(input.toString(), formatter)
//    }
//
//    override fun parseLiteral(input: Any): LocalDateTime {
//        return LocalDateTime.parse(input.toString(), formatter)
//    }
//}
//
//
//@Configuration
//class GraphQlConfig {
//    @Bean
//    fun runtimeWiringConfigurer(): RuntimeWiringConfigurer {
//        return RuntimeWiringConfigurer { wiringBuilder ->
//            wiringBuilder
//                .scalar(
//                    GraphQLScalarType.newScalar()
//                    .name("LocalDateTime")
//                    .description("Java 8 LocalDateTime")
//                    .coercing(LocalDateTimeCoercing())
//                    .build())
//                .scalar(GraphQLScalarType.newScalar()
//                    .name("LocalDate")
//                    .description("Java 8 LocalDate")
//                    .coercing(LocalDateCoercing())
//                    .build())
//        }
//    }
//}