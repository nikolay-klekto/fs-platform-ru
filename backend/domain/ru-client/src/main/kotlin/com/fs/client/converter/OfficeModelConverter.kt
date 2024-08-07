package com.fs.client.converter

import com.fs.client.ru.AddressModel
import com.fs.client.ru.CompanyAddress
import com.fs.client.ru.OfficeModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Office
import org.springframework.stereotype.Service

@Service
class OfficeModelConverter : ModelConverter<Office, OfficeModel> {
    override fun toModel(rawObject: Office): OfficeModel {
        return OfficeModel(
            id = rawObject.id!!,
            addressId = rawObject.addressId!!,
            companyId = rawObject.companyId!!,
            phoneNumber = rawObject.phoneNumber
        )
    }

    override fun fromModel(modelObject: OfficeModel): Office {
        return Office(
            modelObject.id,
            modelObject.addressId,
            modelObject.companyId,
            modelObject.phoneNumber
        )
    }

    fun fromCompanyAddressToAddressModel(companyAddress: CompanyAddress): AddressModel {
        return AddressModel(
            companyAddress.addressId,
            companyAddress.cityId,
            companyAddress.apartment,
            companyAddress.building,
            companyAddress.house,
            companyAddress.street
        )
    }

    fun fromCompanyAddressToOfficeModel(companyAddress: CompanyAddress): OfficeModel {
        return OfficeModel(
            companyAddress.officeId,
            companyAddress.addressId,
            companyAddress.companyId,
            companyAddress.phoneNumber
        )
    }
}