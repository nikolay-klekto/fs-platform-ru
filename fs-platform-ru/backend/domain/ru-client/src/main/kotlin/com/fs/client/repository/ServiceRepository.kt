package com.fs.client.repository

import com.fs.client.service.ServiceModelConverter
import com.fs.domain.jooq.tables.Service.Companion.SERVICE
import com.fs.domain.jooq.tables.pojos.Service
import org.jooq.DSLContext


abstract class ServiceRepository(open val dsl: DSLContext, open val converter: ServiceModelConverter) {

    fun getById(id: Int) = dsl
        .select(SERVICE.asterisk())
        .from(SERVICE)
        .where(SERVICE.ID.eq(id))
        .map { it.into(Service::class.java) }
        .map(converter::toModel)
}