package com.fs.client.controller

import com.fs.client.repository.ReviewRepository
import com.fs.domain.jooq.tables.pojos.Review
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Review")
@RestController
@RequestMapping("/review", produces = ["application/json"])
class ReviewController(
    private val reviewRepository: ReviewRepository
) {

    @QueryMapping
    suspend fun getReviewById(@Argument id: Long): Review? {
        return reviewRepository.getReviewById(id)
    }

    @QueryMapping
<<<<<<< HEAD
    open fun getAllReviewsByCompany(@Argument id: Long): Flux<ReviewModel> {
        return reviewRepository.getAllReviewByCompanyId(id)
=======
    suspend fun getAllReviewByClientId(@Argument clientId: String): List<Review> {
        return reviewRepository.getAllReviewByClientId(clientId)
>>>>>>> origin/main
    }

    @MutationMapping
    suspend fun updateReview(@Argument review: Review): Boolean {
        return reviewRepository.updateReview(review)
    }

    @MutationMapping
    suspend fun addReview(@Argument review: Review): ErrorModel<Review> {
        return try {
            reviewRepository.insertReview(review)
        } catch (e: Exception) {
            ErrorModel(null, e.message)
        }
    }

    @MutationMapping
    suspend fun deleteReviewById(@Argument id: Long): Boolean {
        return reviewRepository.deleteReviewByID(id)
    }
}
