package com.fs.client.repository.blocked

import com.fs.client.service.ServiceModelConverter
import com.fs.domain.jooq.tables.Service.Companion.SERVICE
import com.fs.domain.jooq.tables.pojos.Service
import com.fs.service.ru.ServiceModel
import org.jooq.DSLContext

abstract class ServiceBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ServiceModelConverter
) {

    fun getById(id: Long): ServiceModel? {

        return dsl.select(SERVICE.asterisk())
            .from(SERVICE)
            .where(SERVICE.ID.eq(id))

            .map { it.into(Service::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}