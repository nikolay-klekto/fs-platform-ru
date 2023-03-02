package com.fs.client.repository.impl

import com.fs.client.repository.ClientRepository
import com.fs.client.repository.PartnerRepository
import com.fs.client.service.PartnerModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultPartnerRepository(
    dsl: DSLContext,
    converter: PartnerModelConverter,
    clientRepository: ClientRepository
) : PartnerRepository(dsl, converter, clientRepository)