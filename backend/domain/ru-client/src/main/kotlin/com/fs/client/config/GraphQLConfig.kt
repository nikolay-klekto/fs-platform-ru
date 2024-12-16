package com.fs.client.config

import graphql.scalars.ExtendedScalars
import graphql.schema.idl.RuntimeWiring
import graphql.schema.idl.SchemaGenerator
import graphql.schema.idl.SchemaParser
import graphql.schema.idl.TypeDefinitionRegistry
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.graphql.execution.GraphQlSource
import org.springframework.stereotype.Component
import java.io.InputStreamReader

@Component
class GraphQLConfig {

    @Bean
    fun runtimeWiring(): RuntimeWiring {
        return RuntimeWiring.newRuntimeWiring()
//            .scalar(ExtendedScalars.DateTime)
//            .scalar(ExtendedScalars.Date)
            .build()
    }

    @Bean
    fun publicQueries(): Set<String> {
        val publicSchema = InputStreamReader(ClassPathResource("graphql/clientPublicSchema.graphqls").inputStream)

        val schemaParser = SchemaParser()
        val typeRegistry = schemaParser.parse(publicSchema)

        val schemaGenerator = SchemaGenerator()
        val graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring())

        // Извлечение полей из query и mutation
        val queries = extractFieldNamesFromSchema(graphQLSchema.queryType)
        val mutations = extractFieldNamesFromSchema(graphQLSchema.mutationType)

        // Объединение query и mutation
        return queries + mutations
    }


    private fun extractFieldNamesFromSchema(type: graphql.schema.GraphQLObjectType?): Set<String> {
        // Если тип отсутствует, возвращаем пустое множество
        return type?.fieldDefinitions?.map { it.name }?.toSet() ?: emptySet()
    }

//    @Bean
//    fun graphQlSource(runtimeWiring: RuntimeWiring): GraphQlSource {
//        val publicSchema = InputStreamReader(ClassPathResource("graphql/clientPublicSchema.graphqls").inputStream)
//        val privateSchema = InputStreamReader(ClassPathResource("graphql/clientPrivateSchema.graphqls").inputStream)
//
//        val schemaParser = SchemaParser()
//        val typeRegistry = TypeDefinitionRegistry()
//        typeRegistry.merge(schemaParser.parse(publicSchema))
//        typeRegistry.merge(schemaParser.parse(privateSchema))
//
//        val schemaGenerator = SchemaGenerator()
//        val graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring)
//
//        return GraphQlSource.builder(graphQLSchema).build()
//    }
}
