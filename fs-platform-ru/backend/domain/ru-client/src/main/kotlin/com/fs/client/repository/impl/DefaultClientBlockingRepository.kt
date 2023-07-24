package com.fs.client.repository.impl

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.service.ClientModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultClientBlockingRepository (
    dsl: DSLContext,
    converter: ClientModelConverter,
    basketBlockingRepository: BasketBlockingRepository
): ClientBlockingRepository(dsl, converter, basketBlockingRepository)