package com.fs.client.service

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.tables.pojos.Service
import com.fs.service.ru.ServiceModel

class ServiceModelConverter : ModelConverter<Service, ServiceModel> {
    override fun toModel(rawObject: Service): ServiceModel {
        return ServiceModel(
            id = rawObject.id,
            price = rawObject.price,
            name = rawObject.name
        )
    }

    override fun fromModel(modelObject: ServiceModel): Service {
        return Service(
            modelObject.id,
            modelObject.price,
            modelObject.name
        )
    }
}