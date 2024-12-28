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
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class OfficeRepository(
    open val dsl: DSLContext,
    open val converter: OfficeModelConverter,
    open val blockingAddressRepository: AddressBlockingRepository,
    open val blockingOfficeRepository: OfficeBlockingRepository
) {
    fun getOfficeById(id: Long): Mono<OfficeModel> {
        return Mono.fromSupplier {
            blockingOfficeRepository.getById(id)
        }
    }

//    fun getOfficeByAddressId(addressId: Long): Mono<OfficeModel> {
//        return Mono.fromSupplier {
//            dsl.selectFrom(OFFICE)
//                .where(OFFICE.ADDRESS_ID.eq(addressId))
//                .fetchOne()
//                ?.into(Office::class.java)
//                ?.let { converter.toModel(it) }
//        }
//    }

    fun getAllByCompanyId(id: Long): Flux<OfficeModel> {
        return Flux.from(
            dsl.select(OFFICE.asterisk()).from(OFFICE)
                .where(OFFICE.COMPANY_ID.eq(id))
        )
            .map { it.into(Office::class.java) }
            .map(converter::toModel)
    }

    fun updateCompanyAddress(companyAddress: CompanyAddress): Mono<Boolean> {
        return Mono.fromSupplier {
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
            return@fromSupplier result
        }
    }

    fun insert(companyAddress: CompanyAddress): Mono<OfficeModel> =
        Mono.fromSupplier {
            val officeModel: OfficeModel = converter.fromCompanyAddressToOfficeModel(companyAddress)
            val addressModel: AddressModel = converter.fromCompanyAddressToAddressModel(companyAddress)
            val newOfficeRecord: OfficeRecord = dsl.newRecord(OFFICE)
            val address: AddressModel = blockingAddressRepository.create(addressModel)!!
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