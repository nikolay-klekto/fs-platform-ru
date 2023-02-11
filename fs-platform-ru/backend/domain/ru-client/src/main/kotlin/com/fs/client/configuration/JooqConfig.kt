//package com.fs.client.configuration
//
//import org.cfg4j.provider.ConfigurationProvider
//import org.cfg4j.provider.ConfigurationProviderBuilder
//import org.cfg4j.source.ConfigurationSource
//import org.cfg4j.source.context.filesprovider.ConfigFilesProvider
//import org.cfg4j.source.files.FilesConfigurationSource
//import org.cfg4j.source.reload.ReloadStrategy
//import org.cfg4j.source.reload.strategy.PeriodicalReloadStrategy
//import org.jetbrains.kotlin.com.google.common.io.Resources
//import org.jooq.DSLContext
//import org.jooq.SQLDialect
//import org.jooq.impl.DataSourceConnectionProvider
//import org.jooq.impl.DefaultConfiguration
//import org.jooq.impl.DefaultDSLContext
//import org.postgresql.ds.PGSimpleDataSource
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy
//import java.nio.file.Paths
//import java.util.concurrent.TimeUnit
//import javax.sql.DataSource
//
//@Configuration
//open class JooqConfig {
//    @Bean
//    public fun configurationProvider(): ConfigurationProvider {
//        val configFilesProvider =
//            ConfigFilesProvider {
//                listOf(
//                    Paths.get(Resources.getResource("ru-client.yaml").toURI())
//                )
//            }
//
//        val reloadStrategy: ReloadStrategy = PeriodicalReloadStrategy(1, TimeUnit.HOURS)
//
//
//        val source: ConfigurationSource = FilesConfigurationSource(configFilesProvider)
//
//        return ConfigurationProviderBuilder()
//            .withConfigurationSource(source)
//            .withReloadStrategy(reloadStrategy)
//            .build()
//    }
//
//    @Bean
//    public fun dataSource(): DataSource {
//        val dataSource = PGSimpleDataSource()
//        val jooqSettingsConfig: JooqSettingsConfig =
//            configurationProvider().bind("jooq", JooqSettingsConfig::class.java)
//        dataSource.setUrl(jooqSettingsConfig.url())
//        dataSource.user = jooqSettingsConfig.user();
//        dataSource.password = jooqSettingsConfig.password();
//        return dataSource;
//    }
//
//    @Bean
//    fun transactionAwareDataSource(): TransactionAwareDataSourceProxy? {
//        return TransactionAwareDataSourceProxy(dataSource())
//    }
//
//    @Bean
//    fun connectionProvider(): DataSourceConnectionProvider? {
//        return DataSourceConnectionProvider(transactionAwareDataSource())
//    }
//
//    @Bean
//    fun configuration(): DefaultConfiguration? {
//        val jooqConfiguration = DefaultConfiguration()
//        jooqConfiguration.set(connectionProvider())
//        val dialect: SQLDialect = SQLDialect.valueOf("POSTGRES")
//        jooqConfiguration.set(dialect)
//        return jooqConfiguration
//    }
//
//    @Bean
//    public fun dslContext(): DSLContext {
//        return DefaultDSLContext(configuration());
//    }
//
//
//}