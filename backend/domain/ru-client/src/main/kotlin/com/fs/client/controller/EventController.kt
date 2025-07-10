package com.fs.client.controller

import com.fs.client.repository.EventRepository
import com.fs.service.ru.EventModel
import com.fs.service.ru.EventWithAddressModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
<<<<<<< HEAD
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Event")
@RestController
@RequestMapping("/events", produces = ["application/json"])
open class EventController(open val eventRepository: EventRepository) {

    @QueryMapping
    open fun getEvent(@Argument eventId: Long): Mono<EventModel> {
=======
import java.time.LocalDate

@Tag(name = "Event")
@RestController
@RequestMapping("/events")
class EventController(private val eventRepository: EventRepository) {

    @QueryMapping
    suspend fun getEvent(@Argument eventId: Long): Event? {
>>>>>>> origin/main
        return eventRepository.getEventById(eventId)
    }

    @QueryMapping
<<<<<<< HEAD
    open fun getAllEvents(): Flux<EventModel> {
=======
    suspend fun getAllEvents(): List<Event> {
>>>>>>> origin/main
        return eventRepository.getAllEvents()
    }

    @QueryMapping
<<<<<<< HEAD
    open fun getAllActualEvents(): Flux<EventModel> {
=======
    suspend fun getAllActualEvents(): List<Event> {
>>>>>>> origin/main
        return eventRepository.getAllActualEvents()
    }

    @QueryMapping
<<<<<<< HEAD
    open fun getFirstNActualEvents(@Argument eventQuantity: Long): Flux<EventModel> {
=======
    suspend fun getEventsAvailableCities(): List<CityModel> {
        return eventRepository.getAllAvailableCities()
    }

    @QueryMapping
    suspend fun getFirstNActualEvents(@Argument eventQuantity: Long): List<Event> {
>>>>>>> origin/main
        return eventRepository.getFirstNActualEvents(eventQuantity)
    }

    @QueryMapping
<<<<<<< HEAD
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
=======
    suspend fun getAllActualEventsByCityId(@Argument cityId: Long): List<Event> {
        return eventRepository.getAllActualEventsByCityId(cityId)
    }

    @QueryMapping
    suspend fun getEventsByTimeRange(
        @Argument from: LocalDate?,
        @Argument to: LocalDate?
    ): List<Event> {
        return eventRepository.getEventsByTimeRange(from, to)
    }

    @MutationMapping
    suspend fun addEvent(@Argument event: EventModel): ErrorModel<Long> {
        return try {
            eventRepository.insertEvent(event)
        } catch (e: Exception) {
            ErrorModel(null, e.message)
        }
>>>>>>> origin/main
    }

    @MutationMapping
    suspend fun updateAllEvents(@Argument events: List<EventModel>): ErrorModel<Boolean> {
        return try {
            eventRepository.updateAllEventsModelsInfo(events)
        } catch (e: Exception) {
            ErrorModel(null, e.message)
        }
    }

    @MutationMapping
    suspend fun updateExpiredEventsStatus(): Boolean {
        return eventRepository.updateExpiredEventsStatus()
    }

    @MutationMapping
    suspend fun deleteEvent(@Argument eventId: Long): Boolean {
        return eventRepository.deleteEvent(eventId)
    }

    @MutationMapping
    suspend fun deleteAllEvents(): Boolean {
        return eventRepository.deleteAllEvents()
    }

    @MutationMapping
    suspend fun deleteAllExpiredEvents(): Boolean {
        return eventRepository.deleteAllExpiredEvents()
    }

    @MutationMapping
    suspend fun createGoogleCalendarEvent(
        @Argument clientEmail: String,
<<<<<<< HEAD
        @Argument event: EventModel): Mono<Boolean>{
        return eventRepository.createGoogleCalendarEvent(clientEmail, event)
=======
        @Argument eventId: Long
    ): Boolean {
        return eventRepository.createGoogleCalendarEvent(clientEmail, eventId)
>>>>>>> origin/main
    }
}
