package com.fs.client.controller

import com.fs.client.repository.ReviewRepository
import com.fs.service.ru.ReviewModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Review")
@RestController
@RequestMapping("/review", produces = ["application/json"])
open class ReviewController(
    open val reviewRepository: ReviewRepository
) {

    @QueryMapping
    open fun getReviewById(@Argument id: Long): Mono<ReviewModel> {
        return reviewRepository.getReviewById(id)
    }

    @QueryMapping
    open fun getAllReviewsByCompany(@Argument id: Long): Flux<ReviewModel> {
        return reviewRepository.getAllReviewByCompanyId(id)
    }

    @QueryMapping
    open fun getAllReviewByClientId(@Argument clientId: Long): Flux<ReviewModel> {
        return reviewRepository.getAllReviewByClientId(clientId)
    }

    @MutationMapping
    open fun updateReview(@Argument review: ReviewModel): Mono<Boolean> {
        return reviewRepository.updateReview(review)
    }

    @MutationMapping
    open fun addReview(@Argument review: ReviewModel): Mono<ErrorModel<ReviewModel>> {
        return reviewRepository.insertReview(review)
            .onErrorResume {
                return@onErrorResume Mono.just(ErrorModel(null, it.message))
            }
    }

    @MutationMapping
    open fun deleteReviewById(@Argument id: Long): Mono<Boolean> {
        return reviewRepository.deleteReviewByID(id)
    }
}