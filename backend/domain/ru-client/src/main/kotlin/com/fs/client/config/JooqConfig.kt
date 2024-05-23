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