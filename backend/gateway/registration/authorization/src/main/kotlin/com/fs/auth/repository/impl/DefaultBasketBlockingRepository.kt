package com.fs.auth.repository.impl

import com.fs.auth.repository.blocked.BasketBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultBasketBlockingRepository(
    dsl: DSLContext
): BasketBlockingRepository(dsl)