package com.fs.client.repository.impl

import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.service.AddressModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultAddressBlockingRepository(
    dsl: DSLContext,
    converter: AddressModelConverter
): AddressBlockingRepository(dsl, converter)
