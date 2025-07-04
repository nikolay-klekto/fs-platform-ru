package com.fs.client.repository.impl

import com.fs.client.repository.ClientResetPasswordRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.service.EmailService
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultClientResetPasswordRepository(
    dsl: DSLContext,
    clientBlockingRepository: ClientBlockingRepository,
    emailService: EmailService
): ClientResetPasswordRepository(dsl, clientBlockingRepository, emailService)