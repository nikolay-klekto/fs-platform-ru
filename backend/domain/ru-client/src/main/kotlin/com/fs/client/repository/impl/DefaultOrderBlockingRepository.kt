package com.fs.client.repository.impl

import com.fs.client.converter.OrderModelConverter
import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.CompanyProfessionBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultOrderBlockingRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    basketBlockingRepository: BasketBlockingRepository,
    companyProfessionBlockingRepository: CompanyProfessionBlockingRepository
) : OrderBlockingRepository(
    dsl, converter, basketBlockingRepository,
    companyProfessionBlockingRepository
)