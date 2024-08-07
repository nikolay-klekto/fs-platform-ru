package com.fs.client.converter

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Position
import com.fs.service.ru.PositionModel
import org.springframework.stereotype.Service

@Service
class PositionModelConverter : ModelConverter<Position, PositionModel> {
    override fun toModel(rawObject: Position): PositionModel {
        return PositionModel(
            id = rawObject.id!!,
            description = rawObject.description,
            name = rawObject.name
        )
    }

    override fun fromModel(modelObject: PositionModel): Position {
        return Position(
            modelObject.id,
            modelObject.description,
            modelObject.name
        )
    }
}