package com.fs.client.ru

import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.ru.enums.EducationModel
import com.fs.client.ru.enums.EmploymentModel
import java.time.LocalDate
import java.time.LocalDateTime

data class ClientModel(
    val id: String?,
    var basketId: Long?,
    val cityId: Long?,
    val activateStatus: Boolean?,
    val birthday: LocalDate?,
    var dateCreated: LocalDateTime?,
    val educationStatus: EducationModel?,
    var email: String?,
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