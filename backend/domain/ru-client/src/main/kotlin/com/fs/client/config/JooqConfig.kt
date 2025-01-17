package com.fs.client.config
import org.jooq.DSLContext
import org.jooq.impl.DefaultConfiguration
import org.jooq.impl.DefaultDSLContext
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource


@Configuration
class JooqConfig {

    @Value("\${spring.datasource.url}")
    lateinit var url: String

    @Value("\${spring.datasource.username}")
    lateinit var username: String

    @Value("\${spring.datasource.password}")
    lateinit var password: String

    @Bean
    fun dataSource(): DataSource {
        return DataSourceBuilder.create()
            .url(url) // Убедитесь, что эти параметры добавлены
            .username(username)
            .password(password)
            .build()
    }

    @Bean
    fun dslContext(dataSource: DataSource): DSLContext {
        val settings = org.jooq.conf.Settings()
            .withRenderQuotedNames(org.jooq.conf.RenderQuotedNames.ALWAYS) // Всегда использовать кавычки
            .withRenderMapping(
                org.jooq.conf.RenderMapping()
                    .withSchemata(
                        listOf(
                            org.jooq.conf.MappedSchema()
                                .withInput("public") // Укажите вашу схему
                                .withOutput(null)    // Убирает схему из запросов
                        )
                    )
            )

        val configuration = DefaultConfiguration()
        configuration.set(dataSource)
        configuration.set(org.jooq.SQLDialect.POSTGRES)
        configuration.set(settings)

        val dslContext = DefaultDSLContext(configuration)

        // Проверочный запрос для убедительности
        val encoding = dslContext.fetchValue("SHOW CLIENT_ENCODING")
        println("Client encoding: $encoding")

        return dslContext
    }

}
