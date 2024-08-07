package com.fs.client.converter

import com.fs.client.ru.PartnerModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Partner
import org.springframework.stereotype.Service

@Service
class PartnerModelConverter : ModelConverter<Partner, PartnerModel> {
    override fun toModel(rawObject: Partner): PartnerModel {
        return PartnerModel(
            id = rawObject.id!!,
            clientId = rawObject.clientId!!,
            isVerified = rawObject.isVerified
        )
    }

    override fun fromModel(modelObject: PartnerModel): Partner {
        return Partner(
            modelObject.id,
            modelObject.clientId,
            modelObject.isVerified
        )
    }
}