package com.fs.client.repository.impl

import com.fs.client.repository.blocked.ReviewBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultReviewBlockingRepository(
    dsl: DSLContext,
) : ReviewBlockingRepository(dsl)