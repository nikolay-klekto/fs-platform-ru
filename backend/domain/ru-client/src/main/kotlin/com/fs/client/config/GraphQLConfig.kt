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
import java.io.InputStreamReader

@Configuration
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

        return extractQueriesFromSchema(graphQLSchema)
    }

    private fun extractQueriesFromSchema(schema: graphql.schema.GraphQLSchema): Set<String> {
        val queryType = schema.queryType
        return queryType.fieldDefinitions.map { it.name }.toSet()
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
