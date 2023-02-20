package com.fs.client.repository.impl

import com.fs.client.repository.AddressRepository
import com.fs.client.service.AddressModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultAddressRepository(
    dsl: DSLContext,
    converter: AddressModelConverter,
) : AddressRepository(dsl, converter)