package com.fs.client.repository.impl

import com.fs.client.repository.PartnerRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.converter.PartnerModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultPartnerRepository(
    dsl: DSLContext,
    converter: PartnerModelConverter,
    clientBlockingRepository: ClientBlockingRepository
) : PartnerRepository(dsl, converter, clientBlockingRepository)