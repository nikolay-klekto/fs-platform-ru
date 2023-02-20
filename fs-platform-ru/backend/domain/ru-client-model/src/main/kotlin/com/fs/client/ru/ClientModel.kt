package com.fs.client.ru

import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.ru.enums.EducationModel
import com.fs.client.ru.enums.EmploymentModel
import java.time.LocalDateTime

data class ClientModel(
    val id: Int,
    var basketId: Int?,
    val cityId: Int?,
    val activateStatus: Boolean?,
    val birthday: LocalDateTime?,
    val dateCreated: LocalDateTime?,
    val educationModelStatus: EducationModel?,
    val email: String?,
    val employment: EmploymentModel?,
    val firstName: String?,
    val lastName: String?,
    val orderQuantity: Int?,
    val password: String?,
    val phoneNumber: String?,
    val role: ClientRoleModel?,
    val telegramUsername: String?,
    val username: String?
)