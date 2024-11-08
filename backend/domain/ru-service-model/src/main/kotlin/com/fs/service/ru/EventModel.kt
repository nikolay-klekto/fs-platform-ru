package com.fs.service.ru

import java.time.LocalDate

data class EventModel(
    val id: Long?,
    val date: LocalDate?,
    val description: String?,
    val isExpired: Boolean?,
    val name: String?,
    val publicPlaceName: String?,
    val site: String?,
    val cityName: String?,
    val time: String?,
    val organizer: String?,
    val category: String?
)