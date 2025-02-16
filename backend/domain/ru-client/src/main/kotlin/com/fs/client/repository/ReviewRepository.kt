package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.repository.blocked.ReviewBlockingRepository
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.domain.jooq.tables.records.ReviewRecord
import com.fs.service.ru.errors.ErrorModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDateTime

abstract class ReviewRepository(
    open val dsl: DSLContext,
    open val reviewBlockingRepository: ReviewBlockingRepository,
    open val clientBlockingRepository: ClientBlockingRepository
) {

    suspend fun getReviewById(id: Long): Review? =
        withContext(Dispatchers.IO) {
            reviewBlockingRepository.getById(id)
        }

    suspend fun getAllReviewByClientId(clientId: String): List<Review> =
        withContext(Dispatchers.IO) {
            dsl.select(REVIEW.asterisk()).from(REVIEW)
                .where(REVIEW.CLIENT_ID.eq(clientId))
                .map { it.into(Review::class.java) }
        }

    suspend fun updateReview(review: Review): Boolean =
        withContext(Dispatchers.IO) {
            val oldReview = reviewBlockingRepository.getById(review.id!!)

            dsl.update(REVIEW)
                .set(REVIEW.DESCRIPTION, review.description ?: oldReview?.description)
                .set(REVIEW.RATE, review.rate ?: oldReview?.rate)
                .where(REVIEW.ID.eq(review.id))
                .execute() == 1
        }

    suspend fun insertReview(reviewModel: Review): ErrorModel<Review> =
        withContext(Dispatchers.IO) {
            val clientRole: ClientRoleModel = clientBlockingRepository.getById(reviewModel.clientId)?.role!!
            if (clientRole != ClientRoleModel.CLIENT) {
                throw Exception("Чтобы оставить отзыв, необходимо пройти процесс регистрации.")
            }
            val newReviewRecord: ReviewRecord = dsl.newRecord(REVIEW)
            newReviewRecord.from(reviewModel)
            newReviewRecord.dateCreated = LocalDateTime.now()
            newReviewRecord.reset(REVIEW.ID)
            newReviewRecord.store()
            ErrorModel(newReviewRecord.into(Review::class.java), null)
        }

    suspend fun deleteReviewByID(id: Long): Boolean =
        withContext(Dispatchers.IO) {
            dsl.deleteFrom(REVIEW)
                .where(REVIEW.ID.eq(id))
                .execute() == 1
        }
}
