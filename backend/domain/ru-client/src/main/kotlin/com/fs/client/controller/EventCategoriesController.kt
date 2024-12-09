package com.fs.client.controller

import com.fs.client.repository.EventCategoriesRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.CityModel
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.domain.jooq.tables.pojos.EventCategories
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Controller
open class EventCategoriesController(
    open val eventCategoriesRepository: EventCategoriesRepository
) {
    @QueryMapping
    fun getAllEventCategories(): Flux<String>{
        return eventCategoriesRepository.getAllEventCategories()
    }

    @QueryMapping
    fun getAllEventCategoriesModels(): Flux<EventCategories>{
        return eventCategoriesRepository.getAllEventCategoriesModels()
    }

    @MutationMapping
    fun addEventCategory(@Argument eventCategory: EventCategories): Mono<EventCategories> {
        return eventCategoriesRepository.insertEventCategory(eventCategory)
    }

    @MutationMapping
    fun updateEventCategory(@Argument eventCategory: EventCategories): Mono<Boolean> {
        return eventCategoriesRepository.updateEventCategory(eventCategory)
    }

    @SchemaMapping(typeName = "Event", field = "eventCategory")
    fun getCategoryForEvent(event: Event): Mono<EventCategories> {
        return eventCategoriesRepository.getEventCategoryById(event.eventCategoryId)
    }
}