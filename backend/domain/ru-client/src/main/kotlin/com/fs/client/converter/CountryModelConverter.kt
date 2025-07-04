package com.fs.client.converter

import com.fs.client.ru.CountryModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.client.ru.enums.CountryNameModel
import com.fs.client.ru.enums.CurrencyModel
import com.fs.domain.jooq.tables.pojos.Country
import org.springframework.stereotype.Service

@Service
class CountryModelConverter : ModelConverter<Country, CountryModel> {
    override fun toModel(rawObject: Country): CountryModel {
        return CountryModel(
            code = rawObject.code!!,
            currency = CurrencyModel.valueOf(rawObject.currency!!),
            name = CountryNameModel.valueOf(rawObject.name!!)
        )
    }

    override fun fromModel(modelObject: CountryModel): Country {
        return Country(
            modelObject.code,
            modelObject.currency?.name,
            modelObject.name?.name
        )
    }
}