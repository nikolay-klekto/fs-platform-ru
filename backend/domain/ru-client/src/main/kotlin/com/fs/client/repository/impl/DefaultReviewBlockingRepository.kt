package com.fs.client.repository.impl

import com.fs.client.repository.blocked.ReviewBlockingRepository
import com.fs.client.converter.ReviewModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultReviewBlockingRepository(
    dsl: DSLContext,
    converter: ReviewModelConverter
) : ReviewBlockingRepository(dsl, converter)