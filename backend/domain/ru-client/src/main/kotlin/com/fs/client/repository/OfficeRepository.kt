package com.fs.client.repository

import com.fs.client.converter.OfficeModelConverter
import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.repository.blocked.OfficeBlockingRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.CompanyAddress
import com.fs.client.ru.OfficeModel
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.Office.Companion.OFFICE
import com.fs.domain.jooq.tables.pojos.Office
import com.fs.domain.jooq.tables.records.OfficeRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class OfficeRepository(
    open val dsl: DSLContext,
    open val converter: OfficeModelConverter,
    open val blockingAddressRepository: AddressBlockingRepository,
    open val blockingOfficeRepository: OfficeBlockingRepository
) {
    suspend fun getOfficeById(id: Long): OfficeModel? =
        withContext(Dispatchers.IO) {
            blockingOfficeRepository.getById(id)
        }

    suspend fun getAllByCompanyId(id: Long): List<OfficeModel> =
        withContext(Dispatchers.IO) {
            dsl.select(OFFICE.asterisk()).from(OFFICE)
                .where(OFFICE.COMPANY_ID.eq(id))
                .map { it.into(Office::class.java) }
                .map(converter::toModel)
        }

    suspend fun updateCompanyAddress(companyAddress: CompanyAddress): Boolean =
        withContext(Dispatchers.IO) {
            var result = false
            if (companyAddress.addressId != null) {
                val newAddressModel = converter.fromCompanyAddressToAddressModel(companyAddress)
                val resultAddressUpdate = blockingAddressRepository.update(newAddressModel)
                if (resultAddressUpdate) {
                    result = true
                }
            }
            if (companyAddress.officeId != null) {
                val resultPhoneUpdate = blockingOfficeRepository.updatePhoneNumberByOfficeId(
                    companyAddress.officeId!!,
                    companyAddress.phoneNumber
                )
                if (resultPhoneUpdate) {
                    result = true
                }
            }
            result
        }

    suspend fun insert(companyAddress: CompanyAddress): OfficeModel =
        withContext(Dispatchers.IO) {
            val officeModel: OfficeModel = converter.fromCompanyAddressToOfficeModel(companyAddress)
            val addressModel: AddressModel = converter.fromCompanyAddressToAddressModel(companyAddress)
            val newOfficeRecord: OfficeRecord = dsl.newRecord(OFFICE)
            val address: AddressModel = blockingAddressRepository.create(addressModel)!!
            officeModel.addressId = address.id
            newOfficeRecord.from(officeModel)
            newOfficeRecord.reset(OFFICE.ID)
            newOfficeRecord.store()
            newOfficeRecord.into(Office::class.java)
        }.let(converter::toModel)

    suspend fun deleteAllByCompanyId(id: Long): Boolean =
        withContext(Dispatchers.IO) {
            val allAddressIdByCompany: List<Long> = dsl.select(OFFICE.ADDRESS_ID)
                .from(OFFICE)
                .where(OFFICE.COMPANY_ID.eq(id))
                .map { it.into(Long::class.java) }

            val result = dsl.deleteFrom(OFFICE)
                .where(OFFICE.COMPANY_ID.eq(id))
                .execute() > 0

            allAddressIdByCompany.forEach {
                dsl.deleteFrom(ADDRESS)
                    .where(ADDRESS.ID.eq(it))
                    .execute()
            }
            result
        }

    suspend fun deleteByOfficeId(id: Long): Boolean =
        withContext(Dispatchers.IO) {
            val addressIdByOffice: Long? = dsl.select(OFFICE.ADDRESS_ID)
                .from(OFFICE)
                .where(OFFICE.ID.eq(id))
                .map { it.into(Long::class.java) }
                .firstOrNull()

            var result = dsl.deleteFrom(OFFICE)
                .where(OFFICE.ID.eq(id))
                .execute() > 0

            if (addressIdByOffice != null) {
                dsl.deleteFrom(ADDRESS)
                    .where(ADDRESS.ID.eq(addressIdByOffice))
                    .execute()
            } else {
                result = false
            }
            result
        }
}
