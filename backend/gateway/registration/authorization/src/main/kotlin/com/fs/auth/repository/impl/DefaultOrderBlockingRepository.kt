package com.fs.auth.repository.impl

import com.fs.auth.repository.blocked.OrderBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderBlockingRepository(
    dsl: DSLContext,
    basketBlockingRepository: DefaultBasketBlockingRepository,
    companyProfessionBlockingRepository: DefaultCompanyProfessionBlockingRepository
): OrderBlockingRepository(dsl, basketBlockingRepository, companyProfessionBlockingRepository){
}