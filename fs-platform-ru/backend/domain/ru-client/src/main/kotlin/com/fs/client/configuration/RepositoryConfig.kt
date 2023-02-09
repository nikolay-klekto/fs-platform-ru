package com.fs.client.configuration

import com.fs.client.repository.ClientRepository
import com.fs.client.repository.ServiceRepository
import com.fs.client.repository.impl.DefaultClientRepository
import com.fs.client.repository.impl.DefaultServiceRepository
import com.fs.client.service.ClientModelConverter
import com.fs.client.service.ServiceModelConverter
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

    private fun serviceModelConverter(): ServiceModelConverter {
        return ServiceModelConverter()
    }

    @Bean
    public fun clientRepository(): ClientRepository {
        return DefaultClientRepository(jooqConfig.dslContext(), clientModelConverter())
    }

    @Bean
    public fun serviceRepository(): ServiceRepository {
        return DefaultServiceRepository(jooqConfig.dslContext(), serviceModelConverter())
    }
}