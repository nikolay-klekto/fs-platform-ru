package com.fs.client.converter

import com.fs.client.ru.AddressModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Address
import org.springframework.stereotype.Service

@Service
class AddressModelConverter : ModelConverter<Address, AddressModel> {
    override fun toModel(rawObject: Address): AddressModel {
        return AddressModel(
            id = rawObject.id!!,
            cityId = rawObject.cityId!!,
            street = rawObject.street,
            house = rawObject.house,
            officeNumber = rawObject.officeNumber
        )
    }

    override fun fromModel(modelObject: AddressModel): Address {
        return Address(
            modelObject.id,
            modelObject.cityId,
            modelObject.street,
            modelObject.house,
            modelObject.officeNumber
        )
    }
}