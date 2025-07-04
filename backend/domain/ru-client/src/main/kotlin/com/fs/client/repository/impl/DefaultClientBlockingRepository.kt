package com.fs.client.repository.impl

import com.fs.client.converter.ClientModelConverter
import com.fs.client.repository.blocked.CityBlockingRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultClientBlockingRepository(
    dsl: DSLContext,
    converter: ClientModelConverter,
    cityBlockingRepository: CityBlockingRepository
) : ClientBlockingRepository(dsl, converter, cityBlockingRepository)