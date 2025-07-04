package com.fs.client.repository

import com.fs.client.converter.PartnerModelConverter
import com.fs.client.ru.PartnerModel
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.CompanyPartner.Companion.COMPANY_PARTNER
import com.fs.domain.jooq.tables.Partner.Companion.PARTNER
import com.fs.domain.jooq.tables.pojos.Partner
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class PartnerRepository(
    open val dsl: DSLContext,
    open val converter: PartnerModelConverter,
) {

    suspend fun getPartnerById(id: Long): PartnerModel? =
        withContext(Dispatchers.IO) {
            dsl.select(PARTNER.asterisk()).from(PARTNER)
                .where(PARTNER.ID.eq(id))
                .map { it.into(Partner::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun getAllPartners(): List<PartnerModel> =
        withContext(Dispatchers.IO) {
            dsl.select(PARTNER.asterisk()).from(PARTNER)
                .map { it.into(Partner::class.java) }
                .map(converter::toModel)
        }

    suspend fun getPartnerByCompanyId(companyId: Long): List<PartnerModel> =
        withContext(Dispatchers.IO) {
            dsl.select(PARTNER.asterisk()).from(PARTNER)
                .where(
                    PARTNER.ID.eq(
                        dsl.select(COMPANY_PARTNER.PARTNER_ID).from(COMPANY_PARTNER)
                            .where(COMPANY_PARTNER.COMPANY_ID.eq(companyId))
                    )
                ).map { it.into(Partner::class.java) }
                .map(converter::toModel)
        }

    suspend fun verifyPartnerStatus(partnerId: Long): Boolean =
        withContext(Dispatchers.IO) {
            dsl.update(PARTNER)
                .set(PARTNER.IS_VERIFIED, ACTIVE_PARTNER_VERIFIED_STATUS)
                .where(PARTNER.ID.eq(partnerId))
                .execute() == 1
        }

    suspend fun deletePartner(partnerId: Long): Boolean =
        withContext(Dispatchers.IO) {
            val returnResult = dsl.deleteFrom(PARTNER)
                .where(PARTNER.ID.eq(partnerId))
                .execute() == 1

            dsl.deleteFrom(CLIENT)
                .where(
                    CLIENT.ID.eq(
                        dsl.select(PARTNER.CLIENT_ID).from(PARTNER)
                            .where(PARTNER.ID.eq(partnerId))
                    )
                ).execute()

            dsl.deleteFrom(COMPANY_PARTNER)
                .where(COMPANY_PARTNER.PARTNER_ID.eq(partnerId))
            returnResult
        }

    companion object {
        private const val ACTIVE_PARTNER_VERIFIED_STATUS = true
    }
}
