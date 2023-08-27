package com.fs.client.repository.impl

import com.fs.client.repository.ReviewRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.repository.blocked.OfficeBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ReviewBlockingRepository
import com.fs.client.service.ReviewModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultReviewRepository(
    dsl: DSLContext,
    converter: ReviewModelConverter,
    reviewBlockingRepository: ReviewBlockingRepository,
    clientBlockingRepository: ClientBlockingRepository,
    orderBlockingRepository: OrderBlockingRepository,
    officeBlockingRepository: OfficeBlockingRepository
) :
    ReviewRepository(
        dsl, converter, reviewBlockingRepository, clientBlockingRepository,
        orderBlockingRepository, officeBlockingRepository
    )