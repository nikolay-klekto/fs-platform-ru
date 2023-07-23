package com.fs.client.controller

import com.fs.client.repository.EventRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.CityModel
import com.fs.service.ru.EventModel
import com.fs.service.ru.EventWithAddressModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Event")
@RestController
@RequestMapping("/events", produces = ["application/json"])
open class EventController(open val eventRepository: EventRepository) {

    @QueryMapping
    open fun getEvent(@Argument eventId: Long): Mono<EventModel> {
        return eventRepository.getByEventId(eventId)
    }

    @QueryMapping
    open fun getAllEvents(): Flux<EventModel> {
        return eventRepository.getAllEvents()
    }

    @QueryMapping
    open fun getAllActualEvents(): Flux<EventModel> {
        return eventRepository.getAllActualEvents()
    }

    @QueryMapping
    open fun getAllActualEventsByCityId(@Argument cityId: Long): Flux<EventModel> {
        return eventRepository.getAllActualEventsByCityId(cityId)
    }

    @MutationMapping
    open fun addAllEvents(@Argument events: List<EventWithAddressModel>): Mono<ErrorModel<Boolean>> {
        return eventRepository.insertAllEvents(events)
            .onErrorResume {
                    return@onErrorResume Mono.just(ErrorModel(null, it.message))
                }
    }

    @MutationMapping
    open fun updateAllEvents(@Argument events: List<EventWithAddressModel>): Mono<ErrorModel<Boolean>> {
        return eventRepository.updateAllEventsModelsInfo(events)
            .onErrorResume {
                return@onErrorResume Mono.just(ErrorModel(null, it.message))
            }
    }

    @MutationMapping
    open fun updateExpiredEventsStatus(): Mono<Boolean> {
        return eventRepository.updateExpiredEventsStatus()
    }

    @MutationMapping
    open fun deleteEvent(@Argument eventId: Long): Mono<Boolean> {
        return eventRepository.deleteEvent(eventId)
    }

    @MutationMapping
    open fun deleteAllEvents(): Mono<Boolean> {
        return eventRepository.deleteAllEvents()
    }

    @MutationMapping
    open fun deleteAllExpiredEvents(): Mono<Boolean> {
        return eventRepository.deleteAllExpiredEvents()
    }
}