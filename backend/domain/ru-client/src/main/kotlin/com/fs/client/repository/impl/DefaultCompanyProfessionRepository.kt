package com.fs.client.repository.impl

import com.fs.client.converter.CompanyProfessionConverter
import com.fs.client.repository.CompanyProfessionRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCompanyProfessionRepository(
    dsl: DSLContext,
    converter: CompanyProfessionConverter
): CompanyProfessionRepository(dsl, converter)