package com.fs.service.ru

import java.time.LocalDateTime

data class ReviewModel(
    val id: Long,
    val companyId: Long,
    val username: String,
    val rate: Long,
    val dateCreated: LocalDateTime,
    val description: String
)
