package com.fs.client.repository.blocked

import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.EventCategories.Companion.EVENT_CATEGORIES
import com.fs.domain.jooq.tables.pojos.Event
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class EventBlockingRepository(
    open val dsl: DSLContext
) {
    suspend fun getEventById(id: Long): Event? =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.ID.eq(id))
                .map { it.into(Event::class.java) }
                .firstOrNull()
        }

    suspend fun getEventCategoryNameById(eventCategoryId: Long?): String? =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT_CATEGORIES.CATEGORY).from(EVENT_CATEGORIES)
                .where(EVENT_CATEGORIES.ID.eq(eventCategoryId))
                .firstOrNull()
                ?.map { it.into(String::class.java) }
        }

    suspend fun getEventCategoryIdByName(categoryName: String?): Long? =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT_CATEGORIES.ID).from(EVENT_CATEGORIES)
                .where(EVENT_CATEGORIES.CATEGORY.equalIgnoreCase(categoryName))
                .firstOrNull()
                ?.map { it.into(Long::class.java) }
        }
}
