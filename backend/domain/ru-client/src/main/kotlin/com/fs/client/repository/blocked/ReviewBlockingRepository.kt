package com.fs.client.repository.blocked

import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import org.jooq.DSLContext

abstract class ReviewBlockingRepository(
    open val dsl: DSLContext) {

    fun getById(reviewId: Long): Review? {
        return dsl.select(REVIEW.asterisk()).from(REVIEW)
            .where(REVIEW.ID.eq(reviewId))
            .map { it.into(Review::class.java) }
            .firstOrNull()
    }
}