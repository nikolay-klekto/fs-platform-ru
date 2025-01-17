package com.fs.service.ru

import com.fs.service.ru.enums.OrderStatus
import org.jetbrains.kotlin.com.google.common.primitives.Longs
import java.time.LocalDateTime


data class OrderModel(
    val id: Long?,
    val basketId: Long?,
    val companyOfficeId: Long?,
    val dateCreated: LocalDateTime?,
    val isExpired: Boolean?,
    val orderStatus: OrderStatus?,
    val startWorkDate: LocalDateTime?,
    val totalWorkDays: Long?,
    val price: Double?,
    val companyProfessionId: Long?,
    val contractNumber: String?
)
