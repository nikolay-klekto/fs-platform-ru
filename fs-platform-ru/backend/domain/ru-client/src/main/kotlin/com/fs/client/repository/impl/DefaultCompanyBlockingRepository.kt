package com.fs.client.repository.impl

import com.fs.client.repository.blocked.CompanyBlockingRepository
import com.fs.client.service.CompanyModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCompanyBlockingRepository(
    dsl: DSLContext,
    converter: CompanyModelConverter
): CompanyBlockingRepository(dsl, converter)