package com.fs.client.repository.impl

import com.fs.client.converter.ClientModelConverter
import com.fs.client.repository.ClientRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.service.PasswordService
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultClientRepository(
    dsl: DSLContext,
    converter: ClientModelConverter,
    clientBlockingRepository: ClientBlockingRepository,
    passwordService: PasswordService
) : ClientRepository(dsl, converter, clientBlockingRepository, passwordService)
