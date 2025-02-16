package com.fs.client.repository

import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.ru.AddressModel
import com.fs.client.converter.AddressModelConverter
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.pojos.Address
import com.fs.domain.jooq.tables.records.AddressRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class AddressRepository(
    open val dsl: DSLContext,
    open val converter: AddressModelConverter,
    open val addressBlockingRepository: AddressBlockingRepository
) {

    /**
     * Only uses for get full information about company office
     */
    suspend fun getAddressById(addressId: Long): AddressModel? =
        withContext(Dispatchers.IO) {
            addressBlockingRepository.getById(addressId)
        }

    /**
     * Use to init address for client and office
     */
    suspend fun insertAddress(addressModel: AddressModel): AddressModel =
        withContext(Dispatchers.IO) {
            val newAddressRecord: AddressRecord = dsl.newRecord(ADDRESS)
            newAddressRecord.from(addressModel)
            newAddressRecord.reset(ADDRESS.ID)
            newAddressRecord.store()
            newAddressRecord.into(Address::class.java)
        }.let(converter::toModel)

    suspend fun updateAddress(address: AddressModel): Boolean =
        withContext(Dispatchers.IO) {
            addressBlockingRepository.update(address)
        }

    suspend fun deleteAddressById(id: Long): Boolean =
        withContext(Dispatchers.IO) {
            dsl.deleteFrom(ADDRESS)
                .where(ADDRESS.ID.eq(id))
                .execute() == 1
        }
}
