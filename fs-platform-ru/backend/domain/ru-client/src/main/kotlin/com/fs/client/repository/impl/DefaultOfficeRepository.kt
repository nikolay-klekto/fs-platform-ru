package com.fs.client.repository.impl

import com.fs.client.repository.OfficeRepository
import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.repository.blocked.OfficeBlockingRepository
import com.fs.client.service.OfficeModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOfficeRepository(
    dsl: DSLContext,
    converter: OfficeModelConverter,
    addressBlockingRepository: AddressBlockingRepository,
    officeBlockingRepository: OfficeBlockingRepository
) :
    OfficeRepository(dsl, converter, addressBlockingRepository, officeBlockingRepository)
