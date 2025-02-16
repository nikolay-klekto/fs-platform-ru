package com.fs.client.controller

import com.fs.client.repository.EventCategoriesRepository
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.domain.jooq.tables.pojos.EventCategories
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller

@Controller
class EventCategoriesController(
    private val eventCategoriesRepository: EventCategoriesRepository
) {

    @QueryMapping
    suspend fun getAllEventCategoriesNames(): List<String> {
        return eventCategoriesRepository.getAllEventCategories()
    }

    @QueryMapping
    suspend fun getAllEventCategories(): List<EventCategories> {
        return eventCategoriesRepository.getAllEventCategoriesModels()
    }

    @MutationMapping
    suspend fun addEventCategory(@Argument eventCategory: EventCategories): EventCategories {
        return eventCategoriesRepository.insertEventCategory(eventCategory)
    }

    @MutationMapping
    suspend fun updateEventCategory(@Argument eventCategory: EventCategories): Boolean {
        return eventCategoriesRepository.updateEventCategory(eventCategory)
    }

    @SchemaMapping(typeName = "Event", field = "eventCategory")
    suspend fun getCategoryForEvent(event: Event): EventCategories? {
        return eventCategoriesRepository.getEventCategoryById(event.eventCategoryId)
    }
}
