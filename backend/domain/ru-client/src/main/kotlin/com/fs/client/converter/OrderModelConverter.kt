package com.fs.client.converter

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Order
import com.fs.service.ru.OrderModel
import org.springframework.stereotype.Service

@Service
class OrderModelConverter : ModelConverter<Order, OrderModel> {
    override fun toModel(rawObject: Order): OrderModel {
        return OrderModel(
            id = rawObject.id,
            basketId = rawObject.basketId,
            companyOfficeId = rawObject.companyOfficeId,
            dateCreated = rawObject.dateCreated,
            orderStatus = rawObject.orderStatus,
            startWorkDate = rawObject.startWorkDate,
            totalWorkDays = rawObject.totalWorkDays,
            price = rawObject.price,
            isExpired = rawObject.isExpired,
            companyProfessionId = rawObject.companyProfessionId
        )
    }

    override fun fromModel(modelObject: OrderModel): Order {
        return Order(
            modelObject.id,
            modelObject.basketId,
            modelObject.companyOfficeId,
            modelObject.isExpired,
            modelObject.startWorkDate,
            modelObject.totalWorkDays,
            modelObject.price,
            modelObject.orderStatus,
            modelObject.dateCreated,
            modelObject.companyProfessionId
        )
    }
}