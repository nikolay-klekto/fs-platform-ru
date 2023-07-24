package com.fs.client.repository

import com.fs.client.ru.CityModel
import com.fs.client.ru.CountryModel
import com.fs.client.service.CityModelConverter
import com.fs.client.service.CountryModelConverter
import com.fs.domain.jooq.tables.Address
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.Office
import com.fs.domain.jooq.tables.pojos.City
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CityRecord
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class CityRepository(
    open val dsl: DSLContext,
    open val cityConverter: CityModelConverter,
) {

    fun getCityById(id: Long): Mono<CityModel> {
        return Mono.from(
            dsl.select(CITY.asterisk()).from(CITY)
                .where(CITY.ID.eq(id))
        )
            .map { it.into(City::class.java) }
            .map(cityConverter::toModel)
    }

    fun getCityByOfficeId(id: Long): CityModel {
        return dsl.select(CITY.asterisk()).from(CITY)
            .where(
                CITY.ID.`in`(
                    dsl.select(Address.ADDRESS.CITY_ID)
                        .from(Address.ADDRESS)
                        .where(
                            Address.ADDRESS.ID.`in`(
                                dsl.select(Office.OFFICE.ADDRESS_ID).from(Office.OFFICE)
                                    .where(Office.OFFICE.ID.eq(id))
                            )
                        )
                )
            )
            .map { it.into(City::class.java) }
            .map(cityConverter::toModel)
            .first()
    }

    fun getAllCities(): Flux<CityModel>{
        return Flux.from(
            dsl.select(CITY.asterisk()).from(CITY)
        )
            .map { it.into(City::class.java) }
            .map(cityConverter::toModel)
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