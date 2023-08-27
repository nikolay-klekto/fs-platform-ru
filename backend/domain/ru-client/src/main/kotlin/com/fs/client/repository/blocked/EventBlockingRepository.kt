package com.fs.client.repository.blocked

import com.fs.client.service.EventModelConverter
import com.fs.domain.jooq.tables.Event
import com.fs.service.ru.EventModel
import org.jooq.DSLContext

abstract class EventBlockingRepository(
    open val dsl: DSLContext,
    open val converter: EventModelConverter
) {
    fun getEventBlockingById(id: Long): EventModel? {
        return dsl.select(Event.EVENT.asterisk()).from(Event.EVENT)
            .where(Event.EVENT.ID.eq(id))
            .map { it.into(com.fs.domain.jooq.tables.pojos.Event::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}