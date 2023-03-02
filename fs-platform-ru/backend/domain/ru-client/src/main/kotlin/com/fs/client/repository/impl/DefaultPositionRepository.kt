package com.fs.client.repository.impl

import com.fs.client.repository.PositionRepository
import com.fs.client.service.PositionModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultPositionRepository(
    dsl: DSLContext,
    converter: PositionModelConverter
) : PositionRepository(dsl, converter)