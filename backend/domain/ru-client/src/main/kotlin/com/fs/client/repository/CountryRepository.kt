package com.fs.client.repository

import com.fs.client.repository.blocked.CountryBlockingRepository
import com.fs.client.ru.CountryModel
import com.fs.client.ru.enums.CountryNameModel
import com.fs.client.converter.CountryModelConverter
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CountryRecord
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class CountryRepository(
    open val dsl: DSLContext,
    open val converter: CountryModelConverter,
    open val countryBlockingRepository: CountryBlockingRepository
) {
    fun getCountryByCode(code: Long): Mono<CountryModel> {
        return Mono.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(COUNTRY.CODE.eq(code))
        )
            .map { it.into(Country::class.java) }
            .map(converter::toModel)
    }

    fun getCountryByName(countryName: CountryNameModel): Mono<CountryModel> {
        return Mono.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
                .where(COUNTRY.NAME.eq(countryName))
        )
            .map { it.into(Country::class.java) }
            .map(converter::toModel)
    }

    fun getCountryByCityId(id: Long): Mono<CountryModel> {
        return Mono.fromSupplier {
            countryBlockingRepository.getCountryByCityId(id)
        }
    }

    fun getAllCountries(): Flux<CountryModel> {
        return Flux.from(
            dsl.select(COUNTRY.asterisk()).from(COUNTRY)
        )
            .map { it.into(Country::class.java) }
            .map(converter::toModel)

    }

    fun insertCountry(countryModel: CountryModel): Mono<CountryModel> {
        return Mono.fromSupplier {
            val newCountryRecord: CountryRecord = dsl.newRecord(COUNTRY)
            val newCountryModel = CountryModel(
                code = countryModel.name!!.value,
                currency = countryModel.currency,
                name = countryModel.name
            )
            newCountryRecord.from(newCountryModel)
            newCountryRecord.store()
            return@fromSupplier newCountryRecord.into(Country::class.java)
        }
            .map(converter::toModel)
    }

    fun deleteCountryByCode(countryCode: Long): Mono<Boolean> {
        return Mono.fromSupplier {
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

    companion object {
//        private val log = LogManager.getLogger()
    }
}