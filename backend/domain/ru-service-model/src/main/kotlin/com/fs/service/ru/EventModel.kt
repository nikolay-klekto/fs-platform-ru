package com.fs.service.ru

import java.time.LocalDateTime

data class EventModel(
    val id: Long?,
    val addressId: Long?,
    val date: LocalDateTime?,
    val description: String?,
    val isExpired: Boolean?,
    val mainGoal: String?,
    val name: String?,
    val phoneNumber: String?,
    val publicPlaceName: String?,
    val site: String?
)
