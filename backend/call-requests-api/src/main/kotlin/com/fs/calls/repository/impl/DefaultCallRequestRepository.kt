package com.fs.calls.repository.impl

import com.fasterxml.jackson.databind.ObjectMapper
import com.fs.calls.repository.CallRequestRepository
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.r2dbc.core.DatabaseClient
import org.springframework.stereotype.Repository

@Repository
class DefaultCallRequestRepository(
    databaseClient: DatabaseClient,
    rabbitTemplate: RabbitTemplate,
    objectMapper: ObjectMapper
) : CallRequestRepository(databaseClient, rabbitTemplate, objectMapper) {
    init {
        println("? DefaultCallRequestRepository создан с ObjectMapper: $objectMapper")
    }
}