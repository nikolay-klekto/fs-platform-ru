package com.fs.client.repository.impl

import com.fs.client.repository.blocked.CountryBlockingRepository
import com.fs.client.converter.CountryModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCountryBlockingRepository(
    dsl: DSLContext,
    converter: CountryModelConverter
) : CountryBlockingRepository(dsl, converter)