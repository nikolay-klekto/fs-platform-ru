//package com.fs.client.configuration
//
//import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties
//import org.springframework.boot.context.properties.ConfigurationProperties
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.ComponentScan
//import org.springframework.context.annotation.Configuration
//import org.springframework.context.annotation.PropertySource
//import javax.sql.DataSource
//
//
//@Configuration
//class DatasourceConfig {
//
//    @Bean
//    fun postgresDataSourceProperties(): DataSourceProperties {
//        return DataSourceProperties()
//    }
//
//    @Bean
//    fun todosDataSource(): DataSource {
//        return postgresDataSourceProperties()
//            .initializeDataSourceBuilder()
//            .build()
//    }
//}
