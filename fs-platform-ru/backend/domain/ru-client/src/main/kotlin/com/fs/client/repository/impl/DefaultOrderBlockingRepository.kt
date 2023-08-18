package com.fs.client.repository.impl

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.service.OrderModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderBlockingRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    basketBlockingRepository: BasketBlockingRepository,
    serviceBlockingRepository: ServiceBlockingRepository
) : OrderBlockingRepository(dsl, converter, basketBlockingRepository, serviceBlockingRepository)