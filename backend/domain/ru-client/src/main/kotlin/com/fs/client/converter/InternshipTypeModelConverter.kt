package com.fs.client.converter

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.InternshipType
import com.fs.service.ru.InternshipTypeModel
import org.springframework.stereotype.Service

@Service
class InternshipTypeModelConverter : ModelConverter<InternshipType, InternshipTypeModel> {
    override fun toModel(rawObject: InternshipType): InternshipTypeModel {
        return InternshipTypeModel(
            id = rawObject.id!!,
            description = rawObject.description!!,
            name = rawObject.name!!
        )
    }

    override fun fromModel(modelObject: InternshipTypeModel): InternshipType {
        return InternshipType(
            modelObject.id,
            modelObject.name,
            modelObject.description
        )
    }
}