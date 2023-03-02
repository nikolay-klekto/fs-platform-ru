package com.fs.client.repository

import com.fs.client.service.ReviewModelConverter
import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.domain.jooq.tables.records.ReviewRecord
import com.fs.service.ru.ReviewModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class ReviewRepository(open val dsl: DSLContext, open val converter: ReviewModelConverter) {

    fun getById(id: Long): Mono<ReviewModel> {
        return Mono.from(
            dsl.select(REVIEW.asterisk()).from(REVIEW)
                .where(REVIEW.ID.eq(id))
        ).map { it.into(Review::class.java) }
            .map(converter::toModel)
    }

    fun getAll(): Flux<ReviewModel> {
        return Flux.from(
            dsl.selectFrom(REVIEW)
        )
            .map { it.into(Review::class.java) }
            .map(converter::toModel)
    }

    fun updateReview(review: ReviewModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldReview = getById(review.id!!).block()

            dsl.update(REVIEW)
                .set(REVIEW.DESCRIPTION, review.description ?: oldReview?.description)
                .set(REVIEW.RATE, review.rate ?: oldReview?.rate)
                .where(REVIEW.ID.eq(review.id))
                .execute() == 1
        }

    }

    fun insert(reviewModel: ReviewModel): Mono<ReviewModel> {
        return Mono.fromSupplier {
            val newReviewRecord: ReviewRecord = dsl.newRecord(REVIEW)
            newReviewRecord.from(reviewModel)
            newReviewRecord.reset(REVIEW.ID)
            newReviewRecord.store()
            return@fromSupplier newReviewRecord.into(Review::class.java)
        }
            .map(converter::toModel)
    }

    fun deleteByID(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(REVIEW)
                .where(REVIEW.ID.eq(id))
                .execute() == 1
        }
    }
}
