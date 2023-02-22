package com.fs.client.repository

import com.fs.client.ru.CityModel
import com.fs.client.ru.CountryModel
import com.fs.client.service.CityModelConverter
import com.fs.client.service.CountryModelConverter
import com.fs.domain.jooq.tables.Cities.Companion.CITIES
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.Cities
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CitiesRecord
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class CityRepository(
    open val dsl: DSLContext,
    open val cityConverter: CityModelConverter,
    open val countryConverter: CountryModelConverter
) {

    fun getCityById(id: Int): Mono<CityModel> {
        return Mono.from(
            dsl.select(CITIES.asterisk()).from(CITIES)
                .where(CITIES.ID.eq(id))
        )
            .map { it.into(Cities::class.java) }
            .map(cityConverter::toModel)
    }

    fun getCountryByCityId(id: Int): Mono<CountryModel> {
        return Mono.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(
                    COUNTRY.CODE.eq(
                        dsl.select(CITIES.COUNTRY_CODE).from(CITIES)
                            .where(CITIES.ID.eq(id))
                    )
                )
        )
            .map { it.into(Country::class.java) }
            .map(countryConverter::toModel)
    }

    fun createCity(newCity: CityModel): Mono<CityModel> {
        return Mono.fromSupplier {
            val newCityRecord: CitiesRecord = dsl.newRecord(CITIES)
            newCityRecord.from(newCity)
            newCityRecord.reset(CITIES.ID)
            newCityRecord.store()
            return@fromSupplier newCityRecord.into(Cities::class.java)
        }
            .map(cityConverter::toModel)
    }

}