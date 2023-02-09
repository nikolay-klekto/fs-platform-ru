package com.fs.client.repository.impl

import com.fs.client.repository.ServiceRepository
import com.fs.client.service.ServiceModelConverter
import com.fs.domain.tables.Service.SERVICE
import com.fs.domain.tables.pojos.Service
import com.fs.service.ru.ServiceModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

class DefaultServiceRepository(
    private val dslContext: DSLContext,
    private val converter: ServiceModelConverter
) : ServiceRepository {

    override fun getServiceById(id: Int): Mono<ServiceModel> {
        return Mono.from(
            dslContext.select(SERVICE.asterisk()).from(SERVICE)
                .where(SERVICE.ID.eq(id))
        )
            .map { it.into(Service::class.java) }
            .map(converter::toModel)
    }
}
