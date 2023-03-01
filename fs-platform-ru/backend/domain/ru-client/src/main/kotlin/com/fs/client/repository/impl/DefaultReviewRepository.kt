package com.fs.client.repository.impl

import com.fs.client.repository.ReviewRepository
import com.fs.client.service.ReviewModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultReviewRepository(dsl: DSLContext, converter: ReviewModelConverter) :
    ReviewRepository(dsl, converter)