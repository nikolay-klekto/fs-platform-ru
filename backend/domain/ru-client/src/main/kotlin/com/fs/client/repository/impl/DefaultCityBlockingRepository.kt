package com.fs.client.repository.impl

import com.fs.client.converter.CityModelConverter
import com.fs.client.repository.blocked.CityBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCityBlockingRepository(
    dsl: DSLContext,
    cityModelConverter: CityModelConverter
): CityBlockingRepository(dsl, cityModelConverter)