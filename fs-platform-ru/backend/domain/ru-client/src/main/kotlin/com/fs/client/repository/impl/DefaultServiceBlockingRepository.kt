package com.fs.client.repository.impl

import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.service.ServiceModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultServiceBlockingRepository(
    dsl: DSLContext,
    converter: ServiceModelConverter
) : ServiceBlockingRepository(dsl, converter)