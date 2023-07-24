package com.fs.client.repository.blocked

import com.fs.client.ru.CountryModel
import com.fs.client.service.CountryModelConverter
import com.fs.domain.jooq.tables.City
import com.fs.domain.jooq.tables.Country.Companion.COUNTRY
import com.fs.domain.jooq.tables.pojos.Country
import org.jooq.DSLContext

abstract class CountryBlockingRepository(
    open val dsl: DSLContext,
    open val converter: CountryModelConverter
) {
    fun getCountryByCityId(id: Long): CountryModel? {
        return dsl.select(COUNTRY.asterisk()).from(COUNTRY)
            .where(
                COUNTRY.CODE.eq(
                    dsl.select(City.CITY.COUNTRY_CODE).from(City.CITY)
                        .where(City.CITY.ID.eq(id))
                )
            ).map { it.into(Country::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}