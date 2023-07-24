package com.fs.client.repository

import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.ru.AddressModel
import com.fs.client.service.AddressModelConverter
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.pojos.Address
import com.fs.domain.jooq.tables.records.AddressRecord
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class AddressRepository(
    open val dsl: DSLContext,
    open val converter: AddressModelConverter,
    open val addressBlockingRepository: AddressBlockingRepository
) {

    /**
     * Only uses for get full information about company office
     */
    fun getByAddressId(id: Long): Mono<AddressModel> {
        return Mono.fromSupplier {
            addressBlockingRepository.getById(id)
        }
    }

    /**
     * Use to init address for client and office
     */
    fun create(addressModel: AddressModel): Mono<AddressModel> =
        Mono.fromSupplier {
            val newAddressRecord: AddressRecord = dsl.newRecord(ADDRESS)
            newAddressRecord.from(addressModel)
            newAddressRecord.reset(ADDRESS.ID)
            newAddressRecord.store()
            return@fromSupplier newAddressRecord.into(Address::class.java)
        }
            .map(converter::toModel)

    fun update(address: AddressModel): Mono<Boolean> {
        return Mono.fromSupplier {
            addressBlockingRepository.update(address)
        }
    }

    fun deleteByAddressId(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(ADDRESS)
                .where(ADDRESS.ID.eq(id))
                .execute() == 1
        }
    }
}