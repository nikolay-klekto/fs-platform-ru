package com.fs.client.repository.impl

import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.InternshipTypeBlockingRepository
import com.fs.client.converter.OrderModelConverter
import com.fs.client.repository.blocked.CompanyProfessionBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderBlockingRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    basketBlockingRepository: BasketBlockingRepository,
    internshipTypeBlockingRepository: InternshipTypeBlockingRepository,
    companyProfessionBlockingRepository: CompanyProfessionBlockingRepository
) : OrderBlockingRepository(dsl, converter, basketBlockingRepository,
    internshipTypeBlockingRepository, companyProfessionBlockingRepository
)