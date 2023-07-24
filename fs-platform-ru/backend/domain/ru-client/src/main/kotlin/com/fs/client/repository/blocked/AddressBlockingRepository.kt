package com.fs.client.repository.blocked

import com.fs.client.ru.AddressModel
import com.fs.client.service.AddressModelConverter
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.pojos.Address
import com.fs.domain.jooq.tables.records.AddressRecord
import org.jooq.DSLContext

abstract class AddressBlockingRepository(
    open val dsl: DSLContext,
    open val converter: AddressModelConverter
) {

    fun getById(addressId: Long): AddressModel? {
        return dsl.select(ADDRESS.asterisk()).from(ADDRESS)
            .where(ADDRESS.ID.eq(addressId))
            .map { it.into(Address::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun create(addressModel: AddressModel): AddressModel? {

        if (addressModel.cityId == null) {
            return null
        }
        val newAddressRecord: AddressRecord = dsl.newRecord(ADDRESS)
        newAddressRecord.from(addressModel)
        newAddressRecord.reset(ADDRESS.ID)
        newAddressRecord.store()
        return converter.toModel(newAddressRecord.into(Address::class.java))
    }

    fun update(address: AddressModel): Boolean {

        val oldAddressModel: AddressModel = getById(address.id) ?: return false
        return dsl.update(ADDRESS)
            .set(ADDRESS.CITY_ID, address.cityId ?: oldAddressModel.cityId)
            .set(ADDRESS.APARTMENT, address.apartment ?: oldAddressModel.apartment)
            .set(ADDRESS.BUILDING, address.building ?: oldAddressModel.building)
            .set(ADDRESS.HOUSE, address.house ?: oldAddressModel.house)
            .set(ADDRESS.STREET, address.street ?: oldAddressModel.street)
            .where(ADDRESS.ID.eq(address.id))
            .execute() == 1
    }
}
