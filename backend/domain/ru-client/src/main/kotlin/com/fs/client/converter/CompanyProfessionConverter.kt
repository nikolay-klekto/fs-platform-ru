package com.fs.client.converter

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.service.ru.CompanyProfessionModel
import org.springframework.stereotype.Service

@Service
class CompanyProfessionConverter : ModelConverter<CompanyProfession, CompanyProfessionModel> {
    override fun toModel(rawObject: CompanyProfession): CompanyProfessionModel {
        return CompanyProfessionModel(
            id = rawObject.id,
            companyId = rawObject.companyId,
            internshipTypeId = rawObject.internshipTypeId,
            pricePerDay = rawObject.pricePerDay,
            professionId = rawObject.professionId
        )
    }

    override fun fromModel(modelObject: CompanyProfessionModel): CompanyProfession {
        return CompanyProfession(
            modelObject.id,
            modelObject.companyId,
            modelObject.internshipTypeId,
            modelObject.pricePerDay,
            modelObject.professionId
        )
    }
}