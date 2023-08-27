package com.fs.client.repository.impl

import com.fs.client.repository.blocked.OfficeBlockingRepository
import com.fs.client.service.OfficeModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOfficeBlockingRepository(
    dslContext: DSLContext,
    converter: OfficeModelConverter
) : OfficeBlockingRepository(dslContext, converter)