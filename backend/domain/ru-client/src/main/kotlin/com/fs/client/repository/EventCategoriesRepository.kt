package com.fs.client.repository

import com.fs.domain.jooq.tables.Company
import com.fs.domain.jooq.tables.EventCategories.Companion.EVENT_CATEGORIES
import com.fs.domain.jooq.tables.pojos.EventCategories
import com.fs.domain.jooq.tables.records.EventCategoriesRecord
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
class EventCategoriesRepository(
    open val dsl: DSLContext
) {

    fun getAllEventCategories(): Flux<String> {
        return Flux.from(
            dsl.selectDistinct(EVENT_CATEGORIES.CATEGORY).from(EVENT_CATEGORIES)
        )
            .map { it.into(String::class.java) }
    }

    fun getAllEventCategoriesModels(): Flux<EventCategories> {
        return Flux.from(
            dsl.select(EVENT_CATEGORIES.asterisk()).from(EVENT_CATEGORIES)
        )
            .map { it.into(EventCategories::class.java) }
    }

    fun getEventCategoryById(id: Long?): Mono<EventCategories> {
        return Mono.fromSupplier {
            dsl.select(EVENT_CATEGORIES.asterisk()).from(EVENT_CATEGORIES)
                .where(EVENT_CATEGORIES.ID.eq(id))
                .firstOrNull()
                ?.map { it.into(EventCategories::class.java) }
        }
    }

    fun insertEventCategory(eventCategory: EventCategories): Mono<EventCategories> {
        return Mono.fromSupplier {
            val newEventCategory: EventCategoriesRecord = dsl.newRecord(EVENT_CATEGORIES)
            newEventCategory.from(eventCategory)
            newEventCategory.reset(EVENT_CATEGORIES.ID)
            newEventCategory.store()
            return@fromSupplier newEventCategory.into(EventCategories::class.java)
        }
    }

    fun updateEventCategory(eventCategory: EventCategories): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldEventCategoryModel: EventCategories =
                dsl.select(EVENT_CATEGORIES.asterisk()).from(EVENT_CATEGORIES)
                    .where(EVENT_CATEGORIES.ID.eq(eventCategory.id))
                    .first()
                    .map { it.into(EventCategories::class.java) }

            dsl.update(EVENT_CATEGORIES)
                .set(EVENT_CATEGORIES.CATEGORY, eventCategory.category ?: oldEventCategoryModel.category)
                .where(EVENT_CATEGORIES.ID.eq(eventCategory.id))
                .execute() == 1
        }
    }

}