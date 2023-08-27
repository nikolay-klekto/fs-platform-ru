package com.fs.service.ru

import java.time.LocalDateTime

data class EventWithAddressModel(
    val id: Long?,
    val cityId: Long?,
    val apartment: Long?,
    val building: Long?,
    val date: LocalDateTime?,
    val description: String?,
    val house: Long?,
    val isExpired: Boolean?,
    val mainGoal: String?,
    val name: String?,
    val phoneNumber: String?,
    val publicPlaceName: String?,
    val site: String?,
    val street: String?

)