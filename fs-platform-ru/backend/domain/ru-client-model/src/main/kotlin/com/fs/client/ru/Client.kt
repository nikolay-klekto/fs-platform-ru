package com.fs.client.ru

import com.fs.client.ru.enums.ClientRole
import com.fs.client.ru.enums.Education
import com.fs.client.ru.enums.Employment
import java.time.LocalDateTime

data class Client(
    val id: Long,
    val username: String,
    val firstName: String,
    val lastName: String,
    val educationStatus: Education,
    val password: String,
    val activateStatus: Boolean,
    val dateCreated: LocalDateTime,
    val birthday: LocalDateTime,
    val orderQuantity: Long,
    val email: String,
    val role: ClientRole,
    val countryCode: Long,
    val cityId: Long,
    val basketId: Long,
    val telegramUsername: String,
    val phoneNumber: String,
    val employment: Employment
)