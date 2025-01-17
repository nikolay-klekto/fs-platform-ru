package com.fs.client.repository.impl

import com.fs.client.repository.ConstantsRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultConstantsRepository(
    dsl: DSLContext,
) : ConstantsRepository(dsl)