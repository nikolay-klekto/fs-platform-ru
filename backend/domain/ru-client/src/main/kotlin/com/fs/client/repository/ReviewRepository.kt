package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.repository.blocked.OfficeBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ReviewBlockingRepository
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.converter.ReviewModelConverter
import com.fs.domain.jooq.tables.Review.Companion.REVIEW
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.domain.jooq.tables.records.ReviewRecord
import com.fs.service.ru.OrderModel
import com.fs.service.ru.ReviewModel
import com.fs.service.ru.enums.OrderStatus
import com.fs.service.ru.errors.ErrorModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class ReviewRepository(
    open val dsl: DSLContext,
    open val converter: ReviewModelConverter,
    open val reviewBlockingRepository: ReviewBlockingRepository,
    open val clientBlockingRepository: ClientBlockingRepository,
    open val blockingOrderRepository: OrderBlockingRepository,
    open val officeBlockingRepository: OfficeBlockingRepository
) {

    fun getReviewById(id: Long): Mono<ReviewModel> {
        return Mono.fromSupplier {
            reviewBlockingRepository.getById(id)
        }
    }

    fun getAllReviewByClientId(clientId: String): Flux<ReviewModel>{
        return Flux.from(
            dsl.select(REVIEW.asterisk()).from(REVIEW)
                .where(REVIEW.CLIENT_ID.eq(clientId))
        ).map { it.into(Review::class.java) }
            .map(converter::toModel)
    }

    fun getAllReviewByCompanyId(id: Long): Flux<ReviewModel> {
        return Flux.from(
            dsl.selectFrom(REVIEW)
                .where(REVIEW.COMPANY_ID.eq(id))
        )
            .map { it.into(Review::class.java) }
            .map(converter::toModel)
    }

    fun updateReview(review: ReviewModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldReview = reviewBlockingRepository.getById(review.id!!)

            dsl.update(REVIEW)
                .set(REVIEW.DESCRIPTION, review.description ?: oldReview?.description)
                .set(REVIEW.RATE, review.rate ?: oldReview?.rate)
                .where(REVIEW.ID.eq(review.id))
                .execute() == 1
        }

    }

    fun insertReview(reviewModel: ReviewModel): Mono<ErrorModel<ReviewModel>> {
        return Mono.fromSupplier {
            val clientRole: ClientRoleModel = clientBlockingRepository.getById(reviewModel.clientId)?.role!!
            if (clientRole != ClientRoleModel.CLIENT) {
                throw Exception("Чтобы оставить отзыв, необходимо пройти процесс регистрации.")
            }

            val allClientOrders: List<OrderModel> =
                blockingOrderRepository.getAllByClientId(reviewModel.clientId!!)
                    .filter { it.orderStatus!!.name == OrderStatus.EXPIRED.name }

            var isCurrentUserWorkInThisCompany = false

            allClientOrders.forEach { orderModel ->
                val currentCompanyId: Long = officeBlockingRepository.getCompanyIdByOrderId(orderModel.id!!)
                if (currentCompanyId == reviewModel.companyId) {
                    isCurrentUserWorkInThisCompany = true
                }
            }

            if (!isCurrentUserWorkInThisCompany) {
                throw Exception("Чтобы оставить отзыв на эту компанию, вы должны пройти в ней стажировку.")
            }

            val newReviewRecord: ReviewRecord = dsl.newRecord(REVIEW)
            newReviewRecord.from(reviewModel)
            newReviewRecord.reset(REVIEW.ID)
            newReviewRecord.store()
            return@fromSupplier newReviewRecord.into(Review::class.java)
        }
            .map(converter::toModel)
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
