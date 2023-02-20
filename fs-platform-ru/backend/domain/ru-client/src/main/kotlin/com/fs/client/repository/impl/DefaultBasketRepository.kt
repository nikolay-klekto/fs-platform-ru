package com.fs.client.repository.impl

import com.fs.client.repository.BasketRepository
import com.fs.client.service.BasketModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultBasketRepository(
    dsl: DSLContext,
    converter: BasketModelConverter,
) : BasketRepository(dsl, converter)