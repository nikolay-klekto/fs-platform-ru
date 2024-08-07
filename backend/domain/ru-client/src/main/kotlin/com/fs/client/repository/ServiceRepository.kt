package com.fs.client.repository

import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.converter.ServiceModelConverter
import com.fs.domain.jooq.tables.Service.Companion.SERVICE
import com.fs.domain.jooq.tables.pojos.Service
import com.fs.domain.jooq.tables.records.ServiceRecord
import com.fs.service.ru.ServiceModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


abstract class ServiceRepository(
    open val dsl: DSLContext,
    open val converter: ServiceModelConverter,
    open val serviceBlockingRepository: ServiceBlockingRepository
) {

    fun getServiceById(id: Long): Mono<ServiceModel> {
        return Mono.fromSupplier {
            serviceBlockingRepository.getById(id)
        }
    }

    fun getAllServices(): Flux<ServiceModel> =
        Flux.from(
            dsl.selectFrom(SERVICE)
        )
            .map { it.into(Service::class.java) }
            .map(converter::toModel)

    fun updateServiceById(id: Long, serviceModel: ServiceModel): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(SERVICE)
                .set(SERVICE.PRICE_PER_DAY, serviceModel.pricePerDay)
                .set(SERVICE.NAME, serviceModel.name)
                .where(SERVICE.ID.eq(id))
                .execute() == 1
        }
    }


    fun insert(serviceModel: ServiceModel) =
        Mono.fromSupplier {
            val newServiceRecord: ServiceRecord = dsl.newRecord(SERVICE)
            newServiceRecord.from(serviceModel)
            newServiceRecord.reset(SERVICE.ID)
            newServiceRecord.store()
            return@fromSupplier newServiceRecord.into(Service::class.java)
        }
            .map(converter::toModel)

    fun deleteByID(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(SERVICE)
                .where(SERVICE.ID.eq(id))
                .execute() == 1
        }
    }
}



