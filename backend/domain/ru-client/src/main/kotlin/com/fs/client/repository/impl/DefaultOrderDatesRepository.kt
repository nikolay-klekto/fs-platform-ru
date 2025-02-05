package com.fs.client.repository.impl

import com.fs.client.repository.OrdersDatesRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultOrderDatesRepository(
    dsl: DSLContext
) : OrdersDatesRepository(dsl)