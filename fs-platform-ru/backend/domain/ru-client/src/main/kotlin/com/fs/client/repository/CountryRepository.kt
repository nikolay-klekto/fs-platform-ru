package com.fs.client.repository

import com.fs.client.ru.CountryModel
import com.fs.client.ru.enums.CountryNameModel
import com.fs.client.service.CountryModelConverter
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CountryRecord
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class CountryRepository(
    open val dsl: DSLContext,
    open val converter: CountryModelConverter
) {
    fun getByCode(code: Long): Mono<CountryModel> {
        return Mono.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(COUNTRY.CODE.eq(code))
        )
            .map { it.into(Country::class.java) }
            .map(converter::toModel)
    }

    fun getByName(countryName: CountryNameModel): Mono<CountryModel> {
        return Mono.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(COUNTRY.NAME.eq(countryName))
        )
            .map { it.into(Country::class.java) }
            .map(converter::toModel)
    }

    fun getByCityId(id: Long): Mono<CountryModel> {
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
            .map(converter::toModel)
    }

    fun insert(countryModel: CountryModel): Mono<CountryModel> {
        return Mono.fromSupplier {
            val newCountryRecord: CountryRecord = dsl.newRecord(COUNTRY)
            val newCountryModel = CountryModel(
                code = countryModel.name.value,
                currency = countryModel.currency,
                name = countryModel.name
            )
            newCountryRecord.from(newCountryModel)
            newCountryRecord.store()
            return@fromSupplier newCountryRecord.into(Country::class.java)
        }
            .map(converter::toModel)
    }

    fun deleteByCountryCode(countryCode: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            val result = dsl.deleteFrom(CITY)
                .where(CITY.COUNTRY_CODE.eq(countryCode))
                .execute() > 0

//            if (!result) {
//                log.info("In current deleted country there are no one city!")
//            }
            dsl.deleteFrom(COUNTRY)
                .where(COUNTRY.CODE.eq(countryCode))
                .execute() == 1
        }
    }

    companion object {
//        private val log = LogManager.getLogger()
    }
}