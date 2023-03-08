package com.fs.client.service

import com.fs.client.ru.CityModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.City
import org.springframework.stereotype.Service

@Service
class CityModelConverter : ModelConverter<City, CityModel> {
    override fun toModel(rawObject: City): CityModel {
        return CityModel(
            id = rawObject.id!!,
            countryCode = rawObject.countryCode,
            name = rawObject.name
        )
    }

    override fun fromModel(modelObject: CityModel): City {
        return City(
            modelObject.id,
            modelObject.countryCode,
            modelObject.name
        )
    }
}