package com.fs.client.repository.impl

import com.fs.client.repository.AddressRepository
import com.fs.client.repository.OfficeRepository
import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.service.OfficeModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOfficeRepository(
    dsl: DSLContext,
    converter: OfficeModelConverter,
    addressRepository: AddressRepository,
    blockingAddressRepository: AddressBlockingRepository
) :
    OfficeRepository(dsl, converter, addressRepository, blockingAddressRepository)
