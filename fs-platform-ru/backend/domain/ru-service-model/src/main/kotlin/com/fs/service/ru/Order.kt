package com.fs.service.ru

import java.time.LocalDateTime


data class Order(
    val id: Long,
    val basketId: Long,
    val cityId: Long,
    val companyId: Long,
    val positionId: Long,
    val serviceId: Long,
    val isExpired: Boolean,
    val startWorkTime: LocalDateTime,
    val totalWorkDays: Long
)
