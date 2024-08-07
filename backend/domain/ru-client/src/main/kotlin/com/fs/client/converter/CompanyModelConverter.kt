package com.fs.client.converter

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Company
import com.fs.service.ru.CompanyModel
import org.springframework.stereotype.Service

@Service
class CompanyModelConverter : ModelConverter<Company, CompanyModel> {
    override fun toModel(rawObject: Company): CompanyModel {
        return CompanyModel(
            id = rawObject.id!!,
            companyIndustry = rawObject.companyIndustry,
            legalCapacityStatus = rawObject.legalCapacityStatus,
            name = rawObject.name,
            site = rawObject.site,
            shortDescription = rawObject.shortDescription
        )
    }

    override fun fromModel(modelObject: CompanyModel): Company {
        return Company(
            modelObject.id,
            modelObject.companyIndustry,
            modelObject.legalCapacityStatus,
            modelObject.name,
            modelObject.site,
            modelObject.shortDescription
        )
    }
}