package com.fs.client.repository.impl

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.converter.BasketModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultBasketBlockingRepository(
    dsl: DSLContext,
    converter: BasketModelConverter
) : BasketBlockingRepository(dsl, converter)
