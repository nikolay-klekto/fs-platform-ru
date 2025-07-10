package com.fs.client.repository.impl

import com.fs.client.repository.ReviewRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.repository.blocked.ReviewBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultReviewRepository(
    dsl: DSLContext,
    reviewBlockingRepository: ReviewBlockingRepository,
    clientBlockingRepository: ClientBlockingRepository
) :
    ReviewRepository(
        dsl, reviewBlockingRepository, clientBlockingRepository
    )