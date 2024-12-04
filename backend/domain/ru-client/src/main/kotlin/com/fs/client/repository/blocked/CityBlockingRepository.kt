package com.fs.client.repository.blocked

import com.fs.domain.jooq.tables.City.Companion.CITY
import org.jooq.DSLContext


abstract class CityBlockingRepository(
    open val dsl: DSLContext
) {
    fun getCityIdByName(name: String?): Long? {
        return dsl.select(CITY.ID).from(CITY)
            .where(CITY.NAME.equalIgnoreCase(name))
            .map { it.into(Long::class.java) }
            .firstOrNull()
    }

    fun getCityNameById(cityId: Long?): String? {
        return dsl.select(CITY.NAME).from(CITY)
            .where(CITY.ID.eq(cityId))
            .map { it.into(String::class.java) }
            .firstOrNull()
    }
}