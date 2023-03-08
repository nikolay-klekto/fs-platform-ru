package com.fs.client.repository

import com.fs.client.ru.CityModel
import com.fs.client.ru.CountryModel
import com.fs.client.service.CityModelConverter
import com.fs.client.service.CountryModelConverter
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.City
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CityRecord
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class CityRepository(
    open val dsl: DSLContext,
    open val cityConverter: CityModelConverter,
    open val countryConverter: CountryModelConverter
) {

    fun getCityById(id: Long): Mono<CityModel> {
        return Mono.from(
            dsl.select(CITY.asterisk()).from(CITY)
                .where(CITY.ID.eq(id))
        )
            .map { it.into(City::class.java) }
            .map(cityConverter::toModel)
    }

    fun getCountryByCityId(id: Long): Mono<CountryModel> {
        return Mono.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(
                    COUNTRY.CODE.eq(
                        dsl.select(CITY.COUNTRY_CODE).from(CITY)
                            .where(CITY.ID.eq(id))
                    )
                )
        )
            .map { it.into(Country::class.java) }
            .map(countryConverter::toModel)
    }

    fun createCity(newCity: CityModel): Mono<CityModel> {
        return Mono.fromSupplier {
            val newCityRecord: CityRecord = dsl.newRecord(CITY)
            newCityRecord.from(newCity)
            newCityRecord.reset(CITY.ID)
            newCityRecord.store()
            return@fromSupplier newCityRecord.into(City::class.java)
        }
            .map(cityConverter::toModel)
    }

    fun deleteCity(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(CITY)
                .where(CITY.ID.eq(id))
                .execute() == 1
        }
    }

}