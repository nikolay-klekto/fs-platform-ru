package com.fs.client.repository.impl

import com.fs.client.repository.OrderRepository
import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.converter.OrderModelConverter
import com.fs.client.repository.blocked.ProfessionBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    basketBlockingRepository: BasketBlockingRepository,
    orderBlockingRepository: OrderBlockingRepository,
    professionBlockingRepository: ProfessionBlockingRepository,
    companyProfessionBlockingRepository: DefaultCompanyProfessionBlockingRepository
) : OrderRepository(dsl, converter, basketBlockingRepository,
    orderBlockingRepository, professionBlockingRepository, companyProfessionBlockingRepository)