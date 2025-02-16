package com.fs.client.controller

import com.fs.client.repository.EventRepository
import com.fs.client.ru.CityModel
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@Tag(name = "Event")
@RestController
@RequestMapping("/events")
class EventController(private val eventRepository: EventRepository) {

    @QueryMapping
    suspend fun getEvent(@Argument eventId: Long): Event? {
        return eventRepository.getEventById(eventId)
    }

    @QueryMapping
    suspend fun getAllEvents(): List<Event> {
        return eventRepository.getAllEvents()
    }

    @QueryMapping
    suspend fun getAllActualEvents(): List<Event> {
        return eventRepository.getAllActualEvents()
    }

    @QueryMapping
    suspend fun getEventsAvailableCities(): List<CityModel> {
        return eventRepository.getAllAvailableCities()
    }

    @QueryMapping
    suspend fun getFirstNActualEvents(@Argument eventQuantity: Long): List<Event> {
        return eventRepository.getFirstNActualEvents(eventQuantity)
    }

    @QueryMapping
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
        @Argument eventId: Long
    ): Boolean {
        return eventRepository.createGoogleCalendarEvent(clientEmail, eventId)
    }
}
