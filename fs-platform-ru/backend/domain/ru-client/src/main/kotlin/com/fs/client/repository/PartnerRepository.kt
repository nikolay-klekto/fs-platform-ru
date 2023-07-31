package com.fs.client.repository

import com.fs.client.ru.ClientModel
import com.fs.client.ru.PartnerModel
import com.fs.client.service.PartnerModelConverter
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.CompanyPartner.Companion.COMPANY_PARTNER
import com.fs.domain.jooq.tables.Partner.Companion.PARTNER
import com.fs.domain.jooq.tables.pojos.Partner
import com.fs.domain.jooq.tables.records.PartnerRecord
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.ru.enums.ClientRoleModel
import org.jetbrains.kotlin.gradle.utils.loadPropertyFromResources
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

    fun insertPartner(clientModel: ClientModel): Mono<PartnerModel> {
        return Mono.fromSupplier {
            var newClientModel: ClientModel = ClientModel(
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
                ClientRoleModel.PARTNER,
                clientModel.telegramUsername,
                clientModel.username
            )
            if (newClientModel.id == null) {
                newClientModel = clientBlockingRepository.insert(newClientModel)
            }
            val partnerModel = PartnerModel(
                id = 0,
                clientId = newClientModel.id!!

            )
            val newPartnerRecord: PartnerRecord = dsl.newRecord(PARTNER)
            newPartnerRecord.from(partnerModel)
            newPartnerRecord.reset(PARTNER.ID)
            newPartnerRecord.store()
            return@fromSupplier newPartnerRecord.into(Partner::class.java)
        }
            .map(converter::toModel)
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
}
