package com.fs.client.repository.impl

import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.converter.EventModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultEventBlockingRepository(
    dsl: DSLContext
) : EventBlockingRepository(dsl)