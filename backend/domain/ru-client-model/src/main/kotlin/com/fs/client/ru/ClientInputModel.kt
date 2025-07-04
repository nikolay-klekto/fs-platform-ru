package com.fs.client.ru

import com.fs.client.ru.enums.EducationModel
import com.fs.client.ru.enums.EmploymentModel
import java.time.LocalDate

data class ClientInputModel(
    val id: String?,
    val city: String?,
    val birthday: LocalDate?,
    val educationStatus: EducationModel?,
    var email: String?,
    val employment: EmploymentModel?,
    val firstName: String?,
    val lastName: String?,
    val phoneNumber: String?,
    val telegramUsername: String?,
)