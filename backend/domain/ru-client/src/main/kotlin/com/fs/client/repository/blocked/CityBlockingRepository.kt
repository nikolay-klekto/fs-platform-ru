package com.fs.client.repository.blocked

import com.fs.client.converter.CityModelConverter
import com.fs.client.ru.CityModel
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.pojos.City
import com.fs.domain.jooq.tables.records.CityRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class CityBlockingRepository(
    open val dsl: DSLContext,
    open val cityModelConverter: CityModelConverter
) {
    suspend fun getCityIdByName(name: String?): Long? =
        withContext(Dispatchers.IO) {
            val result = dsl.selectFrom(CITY)
                .map { it.into(City::class.java) }
                .map(cityModelConverter::toModel)

            println(result.toString())
            result.stream()
                .filter { it.name.equals(name, true) }
                .findFirst()
                .map { it.id }
                .orElse(null)
        }

    suspend fun getCityNameById(cityId: Long?): String? =
        withContext(Dispatchers.IO) {
            dsl.select(CITY.NAME).from(CITY)
                .where(CITY.ID.eq(cityId))
                .map { it.into(String::class.java) }
                .firstOrNull()
        }

    suspend fun insertCityByName(newCityName: String): CityModel =
        withContext(Dispatchers.IO) {
            val newCityRecord: CityRecord = dsl.newRecord(CITY)
            val newCity = CityModel(
                id = null,
                name = newCityName,
                countryCode = DEFAULT_COUNTRY_CODE
            )
            newCityRecord.from(newCity)
            newCityRecord.reset(CITY.ID)
            newCityRecord.store()
            newCityRecord.into(CityModel::class.java)
        }

    companion object {
        const val DEFAULT_COUNTRY_CODE = 1L
    }
}