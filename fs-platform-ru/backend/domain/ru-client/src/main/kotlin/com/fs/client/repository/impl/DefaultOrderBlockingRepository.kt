package com.fs.client.repository.impl

import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.service.OrderModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderBlockingRepository(
    dsl: DSLContext,
    converter: OrderModelConverter
): OrderBlockingRepository(dsl, converter)