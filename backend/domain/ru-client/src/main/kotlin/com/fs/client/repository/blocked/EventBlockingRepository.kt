package com.fs.client.repository.blocked

<<<<<<< HEAD
import com.fs.client.converter.EventModelConverter
import com.fs.domain.jooq.tables.Event
import com.fs.service.ru.EventModel
=======
import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.EventCategories.Companion.EVENT_CATEGORIES
import com.fs.domain.jooq.tables.pojos.Event
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
>>>>>>> origin/main
import org.jooq.DSLContext

abstract class EventBlockingRepository(
    open val dsl: DSLContext,
    open val converter: EventModelConverter
) {
<<<<<<< HEAD
    fun getEventBlockingById(id: Long): EventModel? {
        return dsl.select(Event.EVENT.asterisk()).from(Event.EVENT)
            .where(Event.EVENT.ID.eq(id))
            .map { it.into(com.fs.domain.jooq.tables.pojos.Event::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }
}
=======
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
>>>>>>> origin/main
