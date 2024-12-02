package com.fs.auth.repository.impl

import com.fs.auth.repository.blocked.CompanyProfessionBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultCompanyProfessionBlockingRepository(
    dsl: DSLContext
): CompanyProfessionBlockingRepository(dsl)