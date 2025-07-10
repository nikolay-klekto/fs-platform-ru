package com.fs.client.repository

import com.fs.client.ru.CityModel
import com.fs.client.converter.CityModelConverter
import com.fs.domain.jooq.tables.Address
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Office
import com.fs.domain.jooq.tables.pojos.City
import com.fs.domain.jooq.tables.records.CityRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class CityRepository(
    open val dsl: DSLContext,
    open val cityConverter: CityModelConverter,
) {

    suspend fun getCityById(id: Long?): CityModel? =
        withContext(Dispatchers.IO) {
            dsl.select(CITY.asterisk()).from(CITY)
                .where(CITY.ID.eq(id))
                .map { it.into(City::class.java) }
                .map(cityConverter::toModel)
                .firstOrNull()
        }

    suspend fun getCityByOfficeId(id: Long): CityModel =
        withContext(Dispatchers.IO) {
            dsl.select(CITY.asterisk()).from(CITY)
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

<<<<<<< HEAD
    fun insertCity(newCity: CityModel): Mono<CityModel> {
        return Mono.fromSupplier {
=======
    suspend fun getAllCities(): List<CityModel> =
        withContext(Dispatchers.IO) {
            dsl.select(CITY.asterisk()).from(CITY)
                .map { it.into(City::class.java) }
                .map(cityConverter::toModel)
        }

    suspend fun getCitiesEnumByCountryCode(code: Long): List<String> =
        withContext(Dispatchers.IO) {
            dsl.select(CITY.NAME).from(CITY)
                .where(CITY.COUNTRY_CODE.eq(code))
                .map { it.into(String::class.java) }
        }

    suspend fun insertCity(newCity: CityModel): CityModel =
        withContext(Dispatchers.IO) {
>>>>>>> origin/main
            val newCityRecord: CityRecord = dsl.newRecord(CITY)
            newCityRecord.from(newCity)
            newCityRecord.reset(CITY.ID)
            newCityRecord.store()
            newCityRecord.into(City::class.java)
        }.let(cityConverter::toModel)

    suspend fun deleteCity(id: Long): Boolean =
        withContext(Dispatchers.IO) {
            dsl.deleteFrom(CITY)
                .where(CITY.ID.eq(id))
                .execute() == 1
        }
}
