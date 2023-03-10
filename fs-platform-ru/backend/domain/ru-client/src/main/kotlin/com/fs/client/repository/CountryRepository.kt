package com.fs.client.repository

import com.fs.client.ru.CountryModel
import com.fs.client.ru.enums.CountryNameModel
import com.fs.client.service.CountryModelConverter
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.Country
import com.fs.domain.jooq.tables.records.CountryRecord
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

    fun deleteByCountryName(countryName: CountryNameModel): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(COUNTRY)
                .where(COUNTRY.NAME.eq(countryName))
                .execute() == 1
        }
    }
}