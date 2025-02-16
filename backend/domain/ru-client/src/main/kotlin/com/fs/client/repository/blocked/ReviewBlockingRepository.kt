package com.fs.client.repository.blocked

import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class ReviewBlockingRepository(
    open val dsl: DSLContext
) {

    suspend fun getById(reviewId: Long): Review? =
        withContext(Dispatchers.IO) {
            dsl.select(REVIEW.asterisk()).from(REVIEW)
                .where(REVIEW.ID.eq(reviewId))
                .map { it.into(Review::class.java) }
                .firstOrNull()
        }
}
