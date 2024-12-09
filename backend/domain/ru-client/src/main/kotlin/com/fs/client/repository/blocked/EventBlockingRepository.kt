package com.fs.client.repository.blocked

import com.fs.client.converter.EventModelConverter
import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.EventCategories.Companion.EVENT_CATEGORIES
import com.fs.domain.jooq.tables.pojos.Event
import org.jooq.DSLContext

abstract class EventBlockingRepository(
    open val dsl: DSLContext
) {
    fun getEventById(id: Long): Event? {
        return dsl.select(EVENT.asterisk()).from(EVENT)
            .where(EVENT.ID.eq(id))
            .map { it.into(Event::class.java) }
            .firstOrNull()
    }

    fun getEventCategoryNameById(eventCategoryId: Long?): String?{
        return dsl.select(EVENT_CATEGORIES.CATEGORY).from(EVENT_CATEGORIES)
            .where(EVENT_CATEGORIES.ID.eq(eventCategoryId))
            .firstOrNull()
            ?.map { it.into(String::class.java) }
    }

    fun getEventCategoryIdByName(categoryName: String?): Long?{
        return dsl.select(EVENT_CATEGORIES.ID).from(EVENT_CATEGORIES)
            .where(EVENT_CATEGORIES.CATEGORY.equalIgnoreCase(categoryName))
            .firstOrNull()
            ?.map { it.into(Long::class.java) }
    }
}