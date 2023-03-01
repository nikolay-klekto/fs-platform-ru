package com.fs.client.controller

import com.fs.client.repository.ReviewRepository
import com.fs.service.ru.ReviewModel
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
    open fun reviewById(@Argument id: Int): Mono<ReviewModel> {
        return reviewRepository.getById(id)
    }

    @QueryMapping
    open fun getAllReviews(): Flux<ReviewModel> {
        return reviewRepository.getAll()
    }

    @MutationMapping
    open fun updateReview(@Argument review: ReviewModel): Mono<Boolean> {
        return reviewRepository.updateById(review)
    }

    @MutationMapping
    open fun addService(@Argument review: ReviewModel): Mono<ReviewModel> {
        return reviewRepository.insert(review)
    }

    @MutationMapping
    open fun deleteReviewById(@Argument id: Int): Mono<Boolean> {
        return reviewRepository.deleteByID(id)
    }
}