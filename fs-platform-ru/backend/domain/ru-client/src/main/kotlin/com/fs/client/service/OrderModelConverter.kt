package com.fs.client.service

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.service.ru.OrderModel
import org.springframework.stereotype.Service

@Service
class OrderModelConverter : ModelConverter<Order, OrderModel> {
    override fun toModel(rawObject: Order): OrderModel {
        return OrderModel(
            id = rawObject.id!!,
            basketId = rawObject.basketId,
            companyOfficeId = rawObject.companyOfficeId,
            positionId = rawObject.positionId,
            serviceId = rawObject.serviceId,
            isExpired = rawObject.isExpired,
            startWorkDate = rawObject.startWorkDate,
            totalWorkDays = rawObject.totalWorkDays
        )
    }

    override fun fromModel(modelObject: OrderModel): Order {
        return Order(
            modelObject.id,
            modelObject.basketId,
            modelObject.companyOfficeId,
            modelObject.positionId,
            modelObject.serviceId,
            modelObject.isExpired,
            modelObject.startWorkDate,
            modelObject.totalWorkDays
        )
    }
}