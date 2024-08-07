package com.fs.client.repository.impl

import com.fs.client.repository.blocked.PositionBlockingRepository
import com.fs.client.converter.PositionModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultPositionBlockingRepository(
    dsl: DSLContext,
    converter: PositionModelConverter
) : PositionBlockingRepository(dsl, converter)