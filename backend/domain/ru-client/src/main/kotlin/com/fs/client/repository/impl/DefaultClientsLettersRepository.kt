package com.fs.client.repository.impl

import com.fs.client.repository.ClientLettersRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultClientsLettersRepository(
    dsl: DSLContext
) : ClientLettersRepository(dsl)