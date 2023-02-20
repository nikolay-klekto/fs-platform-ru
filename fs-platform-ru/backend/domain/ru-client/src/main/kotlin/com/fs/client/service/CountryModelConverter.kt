package com.fs.client.service

import com.fs.client.ru.CountryModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Country
import org.springframework.stereotype.Service

@Service
class CountryModelConverter : ModelConverter<Country, CountryModel> {
    override fun toModel(rawObject: Country): CountryModel {
        return CountryModel(
            code = rawObject.code!!,
            currency = rawObject.currency!!,
            name = rawObject.name!!
        )
    }

    override fun fromModel(modelObject: CountryModel): Country {
        return Country(
            modelObject.code,
            modelObject.currency,
            modelObject.name
        )
    }
}