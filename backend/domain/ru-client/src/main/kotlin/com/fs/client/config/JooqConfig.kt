//package com.fs.client.config
//import org.jooq.DSLContext
//import org.jooq.impl.DefaultDSLContext
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.boot.jdbc.DataSourceBuilder
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import javax.sql.DataSource
//
//@Configuration
//class JooqConfig {
//
//    @Value("\${spring.datasource.url}")
//    lateinit var url: String
//
//    @Value("\${spring.datasource.username}")
//    lateinit var username: String
//
//    @Value("\${spring.datasource.password}")
//    lateinit var password: String
//
//    @Bean
//    fun dataSource(): DataSource {
//        return DataSourceBuilder.create()
//            .url("jdbc:postgresql://funscrut.online:15432/fun_scrut")
//            .username("username")
//            .password("password")
//            .build()
//    }
//
//    @Bean
//    fun dslContext(dataSource: DataSource): DSLContext {
//        val configuration = org.jooq.impl.DefaultConfiguration()
//        configuration.set(dataSource)
//        return DefaultDSLContext(configuration)
//    }
//}

//    @Bean
//    fun jooqConfiguration(): DefaultConfiguration {
//        val configuration = DefaultConfiguration()
//        configuration.set(converterProvider())
//        return configuration
//    }
//
//    @Bean
//    fun converterProvider(): CustomConverterProvider {
//        return CustomConverterProvider()
//    }
//}
