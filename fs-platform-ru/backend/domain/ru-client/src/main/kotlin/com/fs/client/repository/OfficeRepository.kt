package com.fs.client.repository

import com.fs.client.ru.AddressModel
import com.fs.client.ru.CompanyAddress
import com.fs.client.ru.OfficeModel
import com.fs.client.service.OfficeModelConverter
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.Office.Companion.OFFICE
import com.fs.domain.jooq.tables.pojos.Office
import com.fs.domain.jooq.tables.records.OfficeRecord
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class OfficeRepository(
    open val dsl: DSLContext,
    open val converter: OfficeModelConverter,
    open val addressRepository: AddressRepository
) {
    fun getByOfficeId(id: Long): Mono<OfficeModel> {
        return Mono.from(
            dsl.select(OFFICE.asterisk()).from(OFFICE)
                .where(OFFICE.ID.eq(id))
        )
            .map { it.into(Office::class.java) }
            .map(converter::toModel)
    }

    fun getAllByCompanyId(id: Long): Flux<OfficeModel> {
        return Flux.from(
            dsl.select(OFFICE.asterisk()).from(OFFICE)
                .where(OFFICE.COMPANY_ID.eq(id))
        )
            .map { it.into(Office::class.java) }
            .map(converter::toModel)
    }

    fun updatePhoneNumberByOfficeId(id: Long, phoneNumber: String?): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldOfficeModel: OfficeModel = getByOfficeId(id).block() ?: return@fromSupplier false
            dsl.update(OFFICE)
                .set(OFFICE.PHONE_NUMBER, phoneNumber ?: oldOfficeModel.phoneNumber)
                .where(OFFICE.ID.eq(id))
                .execute() == 1
        }
    }

    fun updateCompanyAddress(companyAddress: CompanyAddress): Mono<Boolean> {
        return Mono.fromSupplier {
            var result = false
            if (companyAddress.addressId != null) {
                val newAddressModel = converter.fromCompanyAddressToAddressModel(companyAddress)
                val resultAddressUpdate = addressRepository.update(newAddressModel).block()
                if (resultAddressUpdate == true) {
                    result = resultAddressUpdate
                }
            }
            if (companyAddress.officeId != null) {
                val resultPhoneUpdate =
                    updatePhoneNumberByOfficeId(companyAddress.officeId!!, companyAddress.phoneNumber).block()
                if (resultPhoneUpdate == true) {
                    result = resultPhoneUpdate
                }
            }
            return@fromSupplier result
        }
    }

    fun insert(companyAddress: CompanyAddress): Mono<OfficeModel> =
        Mono.fromSupplier {
            val officeModel: OfficeModel = converter.fromCompanyAddressToOfficeModel(companyAddress)
            val addressModel: AddressModel = converter.fromCompanyAddressToAddressModel(companyAddress)
            val newOfficeRecord: OfficeRecord = dsl.newRecord(OFFICE)
            val address: AddressModel = addressRepository.create(addressModel).block()!!
            officeModel.addressId = address.id
            newOfficeRecord.from(officeModel)
            newOfficeRecord.reset(OFFICE.ID)
            newOfficeRecord.store()
            return@fromSupplier newOfficeRecord.into(Office::class.java)
        }
            .map(converter::toModel)


    fun deleteAllByCompanyId(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {

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
            return@fromSupplier result

        }
    }

    fun deleteByOfficeId(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {

            val addressIdByOffice: Long? =
                dsl.select(OFFICE.ADDRESS_ID)
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


            return@fromSupplier result

        }
    }

}