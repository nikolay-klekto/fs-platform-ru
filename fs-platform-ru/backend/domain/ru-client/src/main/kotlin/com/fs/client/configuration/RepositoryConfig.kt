package com.fs.client.configuration

import com.fs.client.repository.ClientRepository
import com.fs.client.repository.impl.DefaultClientRepository
import com.fs.client.service.ClientModelConverter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class RepositoryConfig(jooqConfiguration: JooqConfig) {

    private final val jooqConfig: JooqConfig

    init {
        jooqConfig = jooqConfiguration
    }

    private fun clientModelConverter(): ClientModelConverter {
        return ClientModelConverter()
    }

    @Bean
    public fun clientRepository(): ClientRepository {
        return DefaultClientRepository(jooqConfig.dslContext(), clientModelConverter())
    }
}