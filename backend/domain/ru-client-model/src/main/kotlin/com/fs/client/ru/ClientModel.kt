package com.fs.client.ru

import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.ru.enums.EducationModel
import com.fs.client.ru.enums.EmploymentModel
import java.time.LocalDate
import java.time.LocalDateTime

data class ClientModel(
    val id: Long?,
    val basketId: Long?,
    val cityId: Long?,
    val activateStatus: Boolean?,
    val birthday: LocalDate?,
    val dateCreated: LocalDateTime?,
    val educationStatus: EducationModel?,
    val email: String?,
    val employment: EmploymentModel?,
    val firstName: String?,
    val lastName: String?,
    val password: String?,
    val phoneNumber: String?,
    val salt: String?,
    val role: ClientRoleModel?,
    val telegramUsername: String?,
    val username: String?
)