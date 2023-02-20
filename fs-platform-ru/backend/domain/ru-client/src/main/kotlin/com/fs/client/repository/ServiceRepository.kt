package com.fs.client.repository

import com.fs.client.service.ServiceModelConverter
import com.fs.domain.jooq.tables.Service.Companion.SERVICE
import com.fs.domain.jooq.tables.pojos.Service
import com.fs.domain.jooq.tables.records.ServiceRecord
import com.fs.service.ru.ServiceModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


abstract class ServiceRepository(open val dsl: DSLContext, open val converter: ServiceModelConverter) {

//    fun getById(id: Int) = dsl
//        .select(SERVICE.asterisk())
//        .from(SERVICE)
//        .where(SERVICE.ID.eq(id))
//        .map { it.into(Service::class.java) }
//        .map(converter::toModel)
//        .first()

    fun getById(id: Int) =
        Mono.from(
            dsl.select(SERVICE.asterisk())
                .from(SERVICE)
                .where(SERVICE.ID.eq(id))
        )
            .map { it.into(Service::class.java) }
            .map(converter::toModel)

    fun getAll(): Flux<ServiceModel> =
        Flux.from(
            dsl.selectFrom(SERVICE)
        )
            .map { it.into(Service::class.java) }
            .map(converter::toModel)

    fun updateById(id: Int, serviceModel: ServiceModel) =
        Mono.from(
            dsl
                .update(SERVICE)
                .set(SERVICE.PRICE, serviceModel.price)
                .set(SERVICE.NAME, serviceModel.name)
                .where(SERVICE.ID.eq(id))
        ).then()

    fun insert(serviceModel: ServiceModel) =
        Mono.fromSupplier {
            val newServiceRecord: ServiceRecord = dsl.newRecord(SERVICE)
            newServiceRecord.from(serviceModel)
            newServiceRecord.reset(SERVICE.ID)
            newServiceRecord.store()
            return@fromSupplier newServiceRecord.into(Service::class.java)
        }
            .map(converter::toModel)

    fun deleteByID(id: Int) =
        Mono.from(
            dsl
                .deleteFrom(SERVICE)
                .where(SERVICE.ID.eq(id))
        ).then()
}



