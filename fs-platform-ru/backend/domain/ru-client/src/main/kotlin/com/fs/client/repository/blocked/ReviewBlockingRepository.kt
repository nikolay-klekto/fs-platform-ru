package com.fs.client.repository.blocked

import com.fs.client.service.ReviewModelConverter
import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.service.ru.ReviewModel
import org.jooq.DSLContext

abstract class ReviewBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ReviewModelConverter
) {

    fun getById(reviewId: Long): ReviewModel? {
        return dsl.select(REVIEW.asterisk()).from(REVIEW)
            .where(REVIEW.ID.eq(reviewId))
            .map { it.into(Review::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}