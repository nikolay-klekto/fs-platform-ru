package com.fs.client.repository.impl

import com.fs.client.repository.CityRepository
import com.fs.client.converter.CityModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCityRepository(
    dsl: DSLContext,
    cityConverter: CityModelConverter,
) : CityRepository(dsl, cityConverter) {
}