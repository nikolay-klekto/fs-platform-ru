package com.fs.client.repository.impl

import com.fs.client.repository.EventCategoriesRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultEventCategoriesRepository(
    dsl: DSLContext
): EventCategoriesRepository(dsl)