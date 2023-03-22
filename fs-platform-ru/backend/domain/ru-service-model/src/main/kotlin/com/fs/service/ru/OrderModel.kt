package com.fs.service.ru

import java.time.LocalDateTime


data class OrderModel(
    val id: Long,
    val basketId: Long?,
    val companyOfficeId: Long?,
    val positionId: Long?,
    val serviceId: Long?,
    val isExpired: Boolean?,
    val startWorkDate: LocalDateTime?,
    val totalWorkDays: Long?
)
