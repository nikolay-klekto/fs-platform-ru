package com.fs.client.repository

import com.fs.client.converter.CityModelConverter
import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.converter.DateTimeConverterService
import com.fs.client.converter.EventModelConverter
import com.fs.client.ru.CityModel
import com.fs.client.service.GoogleCalendarEventService
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.pojos.City
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.errors.ErrorModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.apache.logging.log4j.LogManager
import org.jooq.Condition
import org.jooq.DSLContext
import org.jooq.impl.DSL
import java.time.LocalDate
import java.time.LocalDateTime

abstract class EventRepository(
    open val dsl: DSLContext,
    open val converter: EventModelConverter,
    open val cityConverter: CityModelConverter,
    open val blockingEventRepository: EventBlockingRepository,
    open val googleCalendarService: GoogleCalendarEventService,
    open val dateTimeConverterService: DateTimeConverterService
) {
    suspend fun getEventById(id: Long): Event? =
        withContext(Dispatchers.IO) {
            blockingEventRepository.getEventById(id)
        }

    suspend fun getAllEvents(): List<Event> =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT.asterisk()).from(EVENT)
                .map { it.into(Event::class.java) }
        }

    suspend fun getAllActualEvents(): List<Event> =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS))
                .map { it.into(Event::class.java) }
        }

    suspend fun getAllAvailableCities(): List<CityModel> =
        withContext(Dispatchers.IO) {
            dsl.select(CITY.asterisk()).from(CITY)
                .where(
                    CITY.ID.`in`(
                        dsl.selectDistinct(EVENT.CITY_ID).from(EVENT)
                    )
                )
                .map { it.into(City::class.java) }
                .map(cityConverter::toModel)
        }

    suspend fun getFirstNActualEvents(eventQuantity: Long): List<Event> =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS))
                .limit(eventQuantity)
                .map { it.into(Event::class.java) }
        }

    suspend fun getAllActualEventsByCityId(cityId: Long): List<Event> =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(
                    EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS)
                        .and(CITY.ID.eq(cityId))
                )
                .map { it.into(Event::class.java) }
        }

    suspend fun getEventsByTimeRange(from: LocalDate?, to: LocalDate?): List<Event> =
        withContext(Dispatchers.IO) {
            dsl.select(EVENT.asterisk())
                .from(EVENT)
                .where(
                    listOfNotNull(
                        from?.let { EVENT.DATE.ge(it) },
                        to?.let { EVENT.DATE.le(it) }
                    ).takeIf { it.isNotEmpty() }
                        ?.reduce(Condition::and) // Объединяем условия с помощью and
                        ?: DSL.trueCondition()   // Если список пуст, возвращаем trueCondition
                )
                .map { it.into(Event::class.java) }
        }

    suspend fun createGoogleCalendarEvent(clientEmail: String, eventId: Long): Boolean =
        withContext(Dispatchers.IO) {
            val event = blockingEventRepository.getEventById(eventId)
            val eventStartDateTime = event?.date!!.atStartOfDay()
            val eventEndDateTime = event.date!!.atStartOfDay().plusHours(1)
            val googleEvent = com.google.api.services.calendar.model.Event()
                .setSummary(event.name)
                .setLocation(event.publicPlaceName)
                .setDescription(event.description)
                .setStart(dateTimeConverterService.convertToEventDateTime(eventStartDateTime))
                .setEnd(dateTimeConverterService.convertToEventDateTime(eventEndDateTime))
            googleCalendarService.addEventToCalendar(clientEmail, googleEvent)
            true
        }

    suspend fun insertEvent(event: EventModel): ErrorModel<Long> =
        withContext(Dispatchers.IO) {
            if (event.description == null || event.date == null || event.name == null
                || event.cityName == null || event.category == null
            ) {
                log.error("Some fields are empty")
                throw Exception("Пропущено заполнение обязательных полей!")
            }
            val newExpiredStatus: Boolean = if (event.date!!.isBefore(LocalDate.now())) {
                DEFAULT_EXPIRED_STATUS
            } else {
                ACTIVE_EXPIRED_STATUS
            }
            println(newExpiredStatus)
            val newEventModel = converter.fromModel(event)
            newEventModel.isExpired = newExpiredStatus
            val newEventRecord = dsl.newRecord(EVENT, newEventModel)
            newEventRecord.apply { newEventRecord.reset(EVENT.ID) }
            newEventRecord.store()
            ErrorModel(newEventRecord.id, null)
        }

    suspend fun updateAllEventsModelsInfo(events: List<EventModel>): ErrorModel<Boolean> =
        withContext(Dispatchers.IO) {
            val list = events.map { eventModel ->
                if (eventModel.id == null) {
                    log.error("Field id in event update end-point is empty!")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }
                val pastEventModel: Event? = blockingEventRepository.getEventById(eventModel.id!!)
                if (pastEventModel == null) {
                    log.error("Updatable event doesn't exist! Check event id")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }
                val newExpiredStatus: Boolean = if (eventModel.date != null) {
                    if (eventModel.date!!.isBefore(LocalDate.now())) {
                        DEFAULT_EXPIRED_STATUS
                    } else {
                        ACTIVE_EXPIRED_STATUS
                    }
                } else {
                    pastEventModel.isExpired!!
                }
                val newEventModel = converter.fromModel(eventModel)
                println(newExpiredStatus)
                dsl.update(EVENT)
                    .set(EVENT.DATE, newEventModel.date ?: pastEventModel.date)
                    .set(EVENT.DESCRIPTION, newEventModel.description ?: pastEventModel.description)
                    .set(EVENT.IS_EXPIRED, newExpiredStatus)
                    .set(EVENT.NAME, newEventModel.name ?: pastEventModel.name)
                    .set(EVENT.PUBLIC_PLACE_NAME, newEventModel.publicPlaceName ?: pastEventModel.publicPlaceName)
                    .set(EVENT.SITE, newEventModel.site ?: pastEventModel.site)
                    .set(EVENT.CITY_ID, newEventModel.cityId ?: pastEventModel.cityId)
                    .set(EVENT.TIME, newEventModel.time ?: pastEventModel.time)
                    .set(EVENT.ORGANIZER, newEventModel.organizer ?: pastEventModel.organizer)
                    .set(EVENT.EVENT_CATEGORY_ID, newEventModel.eventCategoryId ?: pastEventModel.eventCategoryId)
                    .set(EVENT.PRICE, newEventModel.price ?: pastEventModel.price)
                    .where(EVENT.ID.eq(eventModel.id))
                    .execute() == 1
            }
            if (list.isEmpty()) {
                ErrorModel(false, null)
            } else {
                val result = list.all { it }
                ErrorModel(result, null)
            }
        }

    suspend fun updateExpiredEventsStatus(): Boolean =
        withContext(Dispatchers.IO) {
            log.info("Scheduler is working. Date and time is: " + LocalDateTime.now())
            dsl.update(EVENT)
                .set(EVENT.IS_EXPIRED, DEFAULT_EXPIRED_STATUS)
                .where(
                    EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS).and(
                        EVENT.DATE.ge(LocalDate.now())
                    )
                ).execute() > 0
        }

suspend fun deleteEvent(eventId: Long): Boolean =
    withContext(Dispatchers.IO) {
        dsl.deleteFrom(EVENT)
            .where(EVENT.ID.eq(eventId))
            .execute() == 1
    }

suspend fun deleteAllEvents(): Boolean =
    withContext(Dispatchers.IO) {
        dsl.deleteFrom(EVENT)
            .execute() > 0
    }

suspend fun deleteAllExpiredEvents(): Boolean =
    withContext(Dispatchers.IO) {
        dsl.deleteFrom(EVENT)
            .where(EVENT.IS_EXPIRED.eq(DEFAULT_EXPIRED_STATUS))
            .execute() > 0
    }

companion object {
    private val log = LogManager.getLogger(EventRepository::class.java)
    private const val ACTIVE_EXPIRED_STATUS: Boolean = false
    private const val DEFAULT_EXPIRED_STATUS: Boolean = true
}
}