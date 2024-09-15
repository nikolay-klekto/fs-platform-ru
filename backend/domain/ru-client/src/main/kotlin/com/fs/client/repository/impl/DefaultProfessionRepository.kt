package com.fs.client.repository.impl

import com.fs.client.repository.ProfessionRepository
import com.fs.client.repository.blocked.ProfessionBlockingRepository
import com.fs.client.converter.ProfessionModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultProfessionRepository(
    dsl: DSLContext,
    converter: ProfessionModelConverter,
    professionBlockingRepository: ProfessionBlockingRepository
) : ProfessionRepository(dsl, converter, professionBlockingRepository)