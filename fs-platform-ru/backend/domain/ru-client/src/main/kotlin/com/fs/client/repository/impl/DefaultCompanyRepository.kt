package com.fs.client.repository.impl

import com.fs.client.repository.CompanyRepository
import com.fs.client.service.CompanyModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCompanyRepository(
    dsl: DSLContext,
    converter: CompanyModelConverter
) : CompanyRepository(dsl, converter)
