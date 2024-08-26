package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.ru.ClientModel
import com.fs.client.ru.PartnerModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.converter.PartnerModelConverter
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.CompanyPartner.Companion.COMPANY_PARTNER
import com.fs.domain.jooq.tables.Partner.Companion.PARTNER
import com.fs.domain.jooq.tables.pojos.Partner
import com.fs.domain.jooq.tables.records.PartnerRecord
import com.fs.service.ru.errors.ErrorModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

abstract class PartnerRepository(
    open val dsl: DSLContext,
    open val converter: PartnerModelConverter,
    open val clientBlockingRepository: ClientBlockingRepository
) {

    fun getPartnerById(id: Long): Mono<PartnerModel> {
        return Mono.from(
            dsl.select(PARTNER.asterisk()).from(PARTNER)
                .where(PARTNER.ID.eq(id))
        ).map { it.into(Partner::class.java) }
            .map(converter::toModel)
    }

    fun getAllPartners(): Flux<PartnerModel> {
        return Flux.from(
            dsl.select(PARTNER.asterisk()).from(PARTNER)
        ).map { it.into(Partner::class.java) }
            .map(converter::toModel)
    }

    fun getPartnerByCompanyId(companyId: Long): Flux<PartnerModel> {
        return Flux.from(
            dsl.select(PARTNER.asterisk()).from(PARTNER)
                .where(
                    PARTNER.ID.eq(
                        dsl.select(COMPANY_PARTNER.PARTNER_ID).from(COMPANY_PARTNER)
                            .where(COMPANY_PARTNER.COMPANY_ID.eq(companyId))
                    )
                )
        ).map { it.into(Partner::class.java) }
            .map(converter::toModel)
    }

    fun insertPartner(clientModel: ClientModel): Mono<ErrorModel<PartnerModel>> {
        return Mono.fromSupplier {
            var newClientModel = ClientModel(
                clientModel.id,
                clientModel.basketId,
                clientModel.cityId,
                clientModel.activateStatus,
                clientModel.birthday,
                clientModel.dateCreated,
                clientModel.educationStatus,
                clientModel.email,
                clientModel.employment,
                clientModel.firstName,
                clientModel.lastName,
                clientModel.password,
                clientModel.phoneNumber,
                clientModel.salt,
                ClientRoleModel.PARTNER,
                clientModel.telegramUsername,
                clientModel.username
            )
            if (newClientModel.id == null) {
                newClientModel = clientBlockingRepository.insert(newClientModel)
            }
            val partnerModel = PartnerModel(
                id = 0,
                clientId = newClientModel.id!!,
                isVerified = DEFAULT_PARTNER_VERIFIED_STATUS

            )
            val newPartnerRecord: PartnerRecord = dsl.newRecord(PARTNER)
            newPartnerRecord.from(partnerModel)
            newPartnerRecord.reset(PARTNER.ID)
            newPartnerRecord.store()
            converter.toModel(newPartnerRecord.into(Partner::class.java))

            return@fromSupplier ErrorModel(
                converter.toModel(newPartnerRecord.into(Partner::class.java)),
                null)
        }
    }

    fun verifyPartnerStatus(partnerId: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(PARTNER)
                .set(PARTNER.IS_VERIFIED, ACTIVE_PARTNER_VERIFIED_STATUS)
                .where(PARTNER.ID.eq(partnerId))
                .execute() == 1
        }
    }

    fun deletePartner(partnerId: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            val returnResult = dsl.deleteFrom(PARTNER)
                .where(PARTNER.ID.eq(partnerId))
                .execute() == 1

            dsl.deleteFrom(CLIENT)
                .where(
                    CLIENT.ID.eq(
                        dsl.select(PARTNER.CLIENT_ID).from(PARTNER)
                            .where(PARTNER.ID.eq(partnerId))
                    )
                )
                .execute()

            dsl.deleteFrom(COMPANY_PARTNER)
                .where(COMPANY_PARTNER.PARTNER_ID.eq(partnerId))
            return@fromSupplier returnResult
        }
    }

    companion object {
        private const val DEFAULT_PARTNER_VERIFIED_STATUS = false
        private const val ACTIVE_PARTNER_VERIFIED_STATUS = true


    }
}
