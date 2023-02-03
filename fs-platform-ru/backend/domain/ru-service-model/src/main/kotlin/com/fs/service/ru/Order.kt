package com.fs.service.ru

import java.time.LocalDateTime


data class Order(
    val id: Long,
    val basketId: Long,
    val companyId: Long,
    val positionId: Long,
    val startWorkTime: LocalDateTime,
    val totalWorkDays: Long,
    val isExpired: Boolean,
    val serviceId: Long,
    val cityId: Long
)
