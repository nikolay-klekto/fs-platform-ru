package com.fs.service.ru

import java.time.LocalDateTime

data class ReviewModel(
    val id: Int?,
    val companyId: Int?,
    val dateCreated: LocalDateTime? = LocalDateTime.now(),
    val description: String?,
    val rate: Int?,
    val username: String?
)
