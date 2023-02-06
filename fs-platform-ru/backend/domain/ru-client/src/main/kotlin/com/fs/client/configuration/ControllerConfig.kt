package com.fs.client.configuration

import com.fs.client.controller.ClientController
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ControllerConfig(
    private val repositoryConfig: RepositoryConfig
) {

    @Bean
    open fun clientController(): ClientController =
        ClientController(
            repositoryConfig.clientRepository()
        )
}