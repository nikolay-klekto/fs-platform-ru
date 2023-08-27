package com.fs.client.service

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Basket
import com.fs.service.ru.BasketModel
import org.springframework.stereotype.Service

@Service
class BasketModelConverter : ModelConverter<Basket, BasketModel> {
    override fun toModel(rawObject: Basket): BasketModel {
        return BasketModel(
            id = rawObject.id!!,
            totalPrice = rawObject.totalPrice
        )
    }

    override fun fromModel(modelObject: BasketModel): Basket {
        return Basket(
            modelObject.id,
            modelObject.totalPrice
        )
    }
}
