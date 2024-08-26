package com.fs.client.repository.impl

import com.fs.client.repository.ServiceRepository
import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.converter.ServiceModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultServiceRepository(
    dsl: DSLContext,
    converter: ServiceModelConverter,
    serviceBlockingRepository: ServiceBlockingRepository
) :
    ServiceRepository(dsl, converter, serviceBlockingRepository)