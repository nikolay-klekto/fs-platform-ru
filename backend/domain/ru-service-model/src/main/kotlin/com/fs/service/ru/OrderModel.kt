package com.fs.service.ru

import com.fs.service.ru.enums.OrderStatus
import java.time.LocalDateTime


data class OrderModel(
    val id: Long?,
    val basketId: Long?,
    val companyOfficeId: Long?,
    val dateCreated: LocalDateTime?,
    val positionId: Long?,
    val serviceId: Long?,
    val orderStatus: OrderStatus?,
    val startWorkDate: LocalDateTime?,
    val totalWorkDays: Long?,
    val price: Double?
)
