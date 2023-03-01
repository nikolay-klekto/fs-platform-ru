package com.fs.service.ru

import java.time.LocalDateTime

data class ReviewModel(
    val id: Long?,
    val companyId: Long?,
    val dateCreated: LocalDateTime? = LocalDateTime.now(),
    val description: String?,
    val rate: Long?,
    val username: String?
)
