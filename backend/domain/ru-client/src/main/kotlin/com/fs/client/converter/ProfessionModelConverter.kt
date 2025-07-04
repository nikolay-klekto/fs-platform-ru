package com.fs.client.converter

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Profession
import com.fs.service.ru.ProfessionModel
import org.springframework.stereotype.Service

@Service
class ProfessionModelConverter : ModelConverter<Profession, ProfessionModel> {
    override fun toModel(rawObject: Profession): ProfessionModel {
        return ProfessionModel(
            id = rawObject.id!!,
            description = rawObject.description,
            name = rawObject.name,
            clientsNumber = rawObject.clientsNumber,
            professionIndustry = rawObject.professionIndustry,
            pricePerWeek = null
        )
    }

    override fun fromModel(modelObject: ProfessionModel): Profession {
        return Profession(
            modelObject.id,
            modelObject.description,
            modelObject.name,
            modelObject.clientsNumber,
            modelObject.professionIndustry
        )
    }
}