//package com.fs.client.config
//
//import org.jooq.impl.DataSourceConnectionProvider
//import org.jooq.impl.DefaultConfiguration
//import org.jooq.impl.DefaultDSLContext
//import org.springframework.boot.jdbc.DataSourceBuilder
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy
//import javax.sql.DataSource
//
//
//@Configuration
//class JooqConfig{
//
//    @Bean
//    fun getDataSource(): DataSource {
//        val dataSourceBuilder = DataSourceBuilder.create()
//        return dataSourceBuilder.build()
//    }
//    @Bean
//    fun connectionProvider(): DataSourceConnectionProvider {
//        return DataSourceConnectionProvider(TransactionAwareDataSourceProxy(getDataSource()))
//    }
//
//    @Bean
//    fun dsl(): DefaultDSLContext {
//        return DefaultDSLContext(configuration())
//    }
//
//    fun configuration(): DefaultConfiguration {
//        val jooqConfiguration = DefaultConfiguration()
//        jooqConfiguration.set(connectionProvider())
//        return jooqConfiguration
//    }
//}