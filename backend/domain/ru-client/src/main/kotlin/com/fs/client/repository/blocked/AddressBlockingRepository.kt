package com.fs.client.repository.blocked

import com.fs.client.ru.AddressModel
import com.fs.client.converter.AddressModelConverter
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.pojos.Address
import com.fs.domain.jooq.tables.records.AddressRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class AddressBlockingRepository(
    open val dsl: DSLContext,
    open val converter: AddressModelConverter
) {

    suspend fun getById(addressId: Long): AddressModel? = withContext(Dispatchers.IO) {
        dsl.select(ADDRESS.asterisk())
            .from(ADDRESS)
            .where(ADDRESS.ID.eq(addressId))
            .map { it.into(Address::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    suspend fun create(addressModel: AddressModel): AddressModel? = withContext(Dispatchers.IO) {
        if (addressModel.cityId == null) {
            return@withContext null
        }
        val newAddressRecord: AddressRecord = dsl.newRecord(ADDRESS)
        newAddressRecord.from(addressModel)
        newAddressRecord.reset(ADDRESS.ID)
        newAddressRecord.store()
        converter.toModel(newAddressRecord.into(Address::class.java))
    }

    suspend fun update(address: AddressModel): Boolean = withContext(Dispatchers.IO) {
        val oldAddressModel: AddressModel = getById(address.id!!) ?: return@withContext false
        dsl.update(ADDRESS)
            .set(ADDRESS.CITY_ID, address.cityId ?: oldAddressModel.cityId)
            .set(ADDRESS.OFFICE_NUMBER, address.officeNumber ?: oldAddressModel.officeNumber)
            .set(ADDRESS.HOUSE, address.house ?: oldAddressModel.house)
            .set(ADDRESS.STREET, address.street ?: oldAddressModel.street)
            .where(ADDRESS.ID.eq(address.id))
            .execute() == 1
    }
}