package com.fs.client.repository

import com.fs.domain.jooq.tables.EventCategories.Companion.EVENT_CATEGORIES
import com.fs.domain.jooq.tables.pojos.EventCategories
import com.fs.domain.jooq.tables.records.EventCategoriesRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class EventCategoriesRepository(
    open val dsl: DSLContext
) {

    suspend fun getAllEventCategories(): List<String> = withContext(Dispatchers.IO) {
        dsl.selectDistinct(EVENT_CATEGORIES.CATEGORY)
            .from(EVENT_CATEGORIES)
            .fetch()
            .map { it.into(String::class.java) }
    }

    suspend fun getAllEventCategoriesModels(): List<EventCategories> = withContext(Dispatchers.IO) {
        dsl.select(EVENT_CATEGORIES.asterisk())
            .from(EVENT_CATEGORIES)
            .fetch()
            .map { it.into(EventCategories::class.java) }
    }

    suspend fun getEventCategoryById(id: Long?): EventCategories? = withContext(Dispatchers.IO) {
        dsl.select(EVENT_CATEGORIES.asterisk())
            .from(EVENT_CATEGORIES)
            .where(EVENT_CATEGORIES.ID.eq(id))
            .fetchOne()
            ?.into(EventCategories::class.java)
    }

    suspend fun insertEventCategory(eventCategory: EventCategories): EventCategories = withContext(Dispatchers.IO) {
        val newEventCategory: EventCategoriesRecord = dsl.newRecord(EVENT_CATEGORIES)
        newEventCategory.from(eventCategory)
        newEventCategory.reset(EVENT_CATEGORIES.ID)
        newEventCategory.store()
        newEventCategory.into(EventCategories::class.java)
    }

    suspend fun updateEventCategory(eventCategory: EventCategories): Boolean = withContext(Dispatchers.IO) {
        val oldEventCategoryModel: EventCategories? =
            dsl.select(EVENT_CATEGORIES.asterisk())
                .from(EVENT_CATEGORIES)
                .where(EVENT_CATEGORIES.ID.eq(eventCategory.id))
                .fetchOne()
                ?.into(EventCategories::class.java)

        dsl.update(EVENT_CATEGORIES)
            .set(EVENT_CATEGORIES.CATEGORY, eventCategory.category ?: oldEventCategoryModel?.category)
            .where(EVENT_CATEGORIES.ID.eq(eventCategory.id))
            .execute() == 1
    }
}