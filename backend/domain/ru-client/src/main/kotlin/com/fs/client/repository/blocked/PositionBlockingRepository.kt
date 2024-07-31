package com.fs.client.repository.blocked

import com.fs.client.converter.PositionModelConverter
import com.fs.domain.jooq.tables.Position.Companion.POSITION
import com.fs.domain.jooq.tables.pojos.Position
import com.fs.service.ru.PositionModel
import org.jooq.DSLContext

abstract class PositionBlockingRepository(
    open val dsl: DSLContext,
    open val converter: PositionModelConverter
) {
    fun getById(positionId: Long): PositionModel? {
        return dsl.select(POSITION.asterisk()).from(POSITION)
            .where(POSITION.ID.eq(positionId))
            .map { it.into(Position::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}