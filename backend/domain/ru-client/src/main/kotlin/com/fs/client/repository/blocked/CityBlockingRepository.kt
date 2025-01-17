package com.fs.client.repository.blocked

import com.fs.client.converter.CityModelConverter
import com.fs.client.ru.CityModel
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.pojos.Basket
import com.fs.domain.jooq.tables.pojos.City
import com.fs.domain.jooq.tables.records.CityRecord
import org.jooq.DSLContext
import kotlin.contracts.contract


abstract class CityBlockingRepository(
    open val dsl: DSLContext,
    open val cityModelConverter: CityModelConverter
) {
    fun getCityIdByName(name: String?): Long? {
        val result = dsl.selectFrom(CITY)
            .map { it.into(City::class.java) }
            .map(cityModelConverter::toModel)




        println(result.toString())
        return result.stream()
            .filter { it.name.equals(name, true) }
            .findFirst()
            .map { it.id }
            .orElse(null)
    }

    fun getCityNameById(cityId: Long?): String? {
        return dsl.select(CITY.NAME).from(CITY)
            .where(CITY.ID.eq(cityId))
            .map { it.into(String::class.java) }
            .firstOrNull()
    }

    fun insertCityByName(newCityName: String): CityModel {
        val newCityRecord: CityRecord = dsl.newRecord(CITY)
        val newCity = CityModel(
            id = null,
            name = newCityName,
            countryCode = DEFAULT_COUNTRY_CODE
        )
        newCityRecord.from(newCity)
        newCityRecord.reset(CITY.ID)
        newCityRecord.store()
        return newCityRecord.into(CityModel::class.java)
    }

    companion object {
        const val DEFAULT_COUNTRY_CODE = 1L
    }
}