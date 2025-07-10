package com.fs.client.repository

import com.fs.client.repository.blocked.CountryBlockingRepository
import com.fs.client.ru.CountryModel
import com.fs.client.ru.enums.CountryNameModel
import com.fs.client.converter.CountryModelConverter
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CountryRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class CountryRepository(
    open val dsl: DSLContext,
    open val converter: CountryModelConverter,
    open val countryBlockingRepository: CountryBlockingRepository
) {
    suspend fun getCountryByCode(code: Long): CountryModel? =
        withContext(Dispatchers.IO) {
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(COUNTRY.CODE.eq(code))
                .map { it.into(Country::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun getCountryByName(countryName: CountryNameModel): CountryModel? =
        withContext(Dispatchers.IO) {
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(COUNTRY.NAME.eq(countryName.name))
                .map { it.into(Country::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun getCountryByCityId(id: Long): CountryModel? =
        withContext(Dispatchers.IO) {
            countryBlockingRepository.getCountryByCityId(id)
        }

    suspend fun getAllCountries(): List<CountryModel> =
        withContext(Dispatchers.IO) {
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .map { it.into(Country::class.java) }
                .map(converter::toModel)
        }

    suspend fun insertCountry(countryModel: CountryModel): CountryModel =
        withContext(Dispatchers.IO) {
            val newCountryRecord: CountryRecord = dsl.newRecord(COUNTRY)
            val newCountryModel = CountryModel(
                code = countryModel.name!!.value,
                currency = countryModel.currency,
                name = countryModel.name
            )
            newCountryRecord.from(newCountryModel)
            newCountryRecord.store()
            newCountryRecord.into(Country::class.java)
        }.let(converter::toModel)

    suspend fun deleteCountryByCode(countryCode: Long): Boolean =
        withContext(Dispatchers.IO) {
            val result = dsl.deleteFrom(CITY)
                .where(CITY.COUNTRY_CODE.eq(countryCode))
                .execute() > 0

            if (!result) {
                println("In current deleted country there are no one city!")
            }
            dsl.deleteFrom(COUNTRY)
                .where(COUNTRY.CODE.eq(countryCode))
                .execute() == 1
        }
}
