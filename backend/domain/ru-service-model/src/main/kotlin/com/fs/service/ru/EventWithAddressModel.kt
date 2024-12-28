package com.fs.service.ru

import java.time.LocalDateTime

data class EventWithAddressModel(
    val id: Long?,
    val cityId: Long?,
    val officeNumber: String?,
    val date: LocalDateTime?,
    val description: String?,
    val house: String?,
    val isExpired: Boolean?,
    val mainGoal: String?,
    val name: String?,
    val phoneNumber: String?,
    val publicPlaceName: String?,
    val site: String?,
    val street: String?

)