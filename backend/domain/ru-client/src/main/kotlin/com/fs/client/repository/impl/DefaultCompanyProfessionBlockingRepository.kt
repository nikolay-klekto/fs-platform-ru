package com.fs.client.repository.impl

import com.fs.client.converter.CompanyProfessionConverter
import com.fs.client.repository.CompanyProfessionRepository
import com.fs.client.repository.blocked.CompanyProfessionBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCompanyProfessionBlockingRepository(
    dsl: DSLContext,
    converter: CompanyProfessionConverter
): CompanyProfessionBlockingRepository(dsl, converter)