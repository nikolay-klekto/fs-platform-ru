package com.fs.client.service

import com.fs.client.ru.CityModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Cities
import org.springframework.stereotype.Service

@Service
class CityModelConverter : ModelConverter<Cities, CityModel> {
    override fun toModel(rawObject: Cities): CityModel {
        return CityModel(
            id = rawObject.id!!,
            countryCode = rawObject.countryCode,
            name = rawObject.name
        )
    }

    override fun fromModel(modelObject: CityModel): Cities {
        return Cities(
            modelObject.id,
            modelObject.countryCode,
            modelObject.name
        )
    }
}