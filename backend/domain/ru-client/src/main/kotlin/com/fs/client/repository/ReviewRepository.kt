package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.repository.blocked.ReviewBlockingRepository
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.domain.jooq.tables.records.ReviewRecord
import com.fs.service.ru.errors.ErrorModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDateTime

abstract class ReviewRepository(
    open val dsl: DSLContext,
    open val reviewBlockingRepository: ReviewBlockingRepository,
    open val clientBlockingRepository: ClientBlockingRepository
) {

    fun getReviewById(id: Long): Mono<Review> {
        return Mono.fromSupplier {
            reviewBlockingRepository.getById(id)
        }
    }

    fun getAllReviewByClientId(clientId: String): Flux<Review> {
        return Flux.from(
            dsl.select(REVIEW.asterisk()).from(REVIEW)
                .where(REVIEW.CLIENT_ID.eq(clientId))
        ).map { it.into(Review::class.java) }
    }

//    fun getAllReviewByCompanyId(id: Long): Flux<Review> {
//        return Flux.from(
//            dsl.selectFrom(REVIEW)
//                .where(REVIEW.COMPANY_ID.eq(id))
//        )
//            .map { it.into(Review::class.java) }
//            .map(converter::toModel)
//    }

    fun updateReview(review: Review): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldReview = reviewBlockingRepository.getById(review.id!!)

            dsl.update(REVIEW)
                .set(REVIEW.DESCRIPTION, review.description ?: oldReview?.description)
                .set(REVIEW.RATE, review.rate ?: oldReview?.rate)
                .where(REVIEW.ID.eq(review.id))
                .execute() == 1
        }

    }

    fun insertReview(reviewModel: Review): Mono<ErrorModel<Review>> {
        return Mono.fromSupplier {
            val clientRole: ClientRoleModel = clientBlockingRepository.getById(reviewModel.clientId)?.role!!
            if (clientRole != ClientRoleModel.CLIENT) {
                throw Exception("Чтобы оставить отзыв, необходимо пройти процесс регистрации.")
            }
            val newReviewRecord: ReviewRecord = dsl.newRecord(REVIEW)
            newReviewRecord.from(reviewModel)
            newReviewRecord.dateCreated = LocalDateTime.now()
            newReviewRecord.reset(REVIEW.ID)
            newReviewRecord.store()
            return@fromSupplier newReviewRecord.into(Review::class.java)
        }
            .map { ErrorModel(it, null) }
    }

    fun deleteReviewByID(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(REVIEW)
                .where(REVIEW.ID.eq(id))
                .execute() == 1
        }
    }
}
