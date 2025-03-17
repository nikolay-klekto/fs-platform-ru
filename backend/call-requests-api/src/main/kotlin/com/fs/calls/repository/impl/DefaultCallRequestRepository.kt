package com.fs.calls.repository.impl

import com.fs.calls.repository.CallRequestRepository
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.r2dbc.core.DatabaseClient
import org.springframework.stereotype.Repository

@Repository
class DefaultCallRequestRepository(
    databaseClient: DatabaseClient,
    rabbitTemplate: RabbitTemplate
) : CallRequestRepository(databaseClient, rabbitTemplate)