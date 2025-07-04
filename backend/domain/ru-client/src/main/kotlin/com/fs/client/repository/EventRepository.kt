package com.fs.client.repository

import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.ru.AddressModel
import com.fs.client.converter.DateTimeConverterService
import com.fs.client.converter.EventModelConverter
import com.fs.client.converter.EventModelConverter.Companion.defaultAddressModel
import com.fs.client.service.GoogleCalendarEventService
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.EventWithAddressModel
import com.fs.service.ru.errors.ErrorModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.apache.logging.log4j.LogManager
import org.jooq.Condition
import org.jooq.DSLContext
<<<<<<< HEAD
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
=======
import org.jooq.impl.DSL
import java.time.LocalDate
>>>>>>> origin/main
import java.time.LocalDateTime

abstract class EventRepository(
    open val dsl: DSLContext,
    open val converter: EventModelConverter,
    open val blockingEventRepository: EventBlockingRepository,
    open val blockingAddressRepository: AddressBlockingRepository,
    open val googleCalendarService: GoogleCalendarEventService,
    open val dateTimeConverterService: DateTimeConverterService
) {
<<<<<<< HEAD
    fun getEventById(id: Long): Mono<EventModel> {
        return Mono.fromSupplier {
            blockingEventRepository.getEventBlockingById(id)
=======
    suspend fun getEventById(id: Long): Event? =
        withContext(Dispatchers.IO) {
            blockingEventRepository.getEventById(id)
>>>>>>> origin/main
        }

<<<<<<< HEAD
    fun getAllEvents(): Flux<EventModel> {
        return Flux.from(
            dsl.select(EVENT.asterisk()).from(EVENT)
        )
            .map { it.into(Event::class.java) }
            .map(converter::toModel)
    }

    fun getAllActualEvents(): Flux<EventModel> {
        return Flux.from(
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS))
        )
            .map { it.into(Event::class.java) }
            .map(converter::toModel)
    }

    fun getFirstNActualEvents(eventQuantity: Long): Flux<EventModel>{
        return Flux.from(
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS))
                .limit(eventQuantity)
        ).map { it.into(EventModel::class.java) }
    }

    fun getAllActualEventsByCityId(cityId: Long): Flux<EventModel> {
        return Flux.from(
=======
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
>>>>>>> origin/main
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(
                    EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS)
                        .and(
                            EVENT.ADDRESS_ID.`in`(
                                dsl.select(ADDRESS.CITY_ID).from(ADDRESS)
                                    .where(ADDRESS.CITY_ID.eq(cityId))
                            )
                        )
                )
<<<<<<< HEAD
        )
            .map { it.into(Event::class.java) }
            .map(converter::toModel)
    }

    fun createGoogleCalendarEvent(clientEmail: String, event: EventModel): Mono<Boolean>{
        return Mono.fromSupplier {
=======
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
>>>>>>> origin/main
            val googleEvent = com.google.api.services.calendar.model.Event()
                .setSummary(event.name)
                .setLocation(event.publicPlaceName)
                .setDescription(event.description)
<<<<<<< HEAD
                .setStart(dateTimeConverterService.convertToEventDateTime(event.date!!))
                .setEnd(dateTimeConverterService.convertToEventDateTime(event.date!!.plusDays(2)))
            googleCalendarService.addEventToCalendar(clientEmail,googleEvent)
            return@fromSupplier true
        }
    }

    fun insertAllEvents(events: List<EventWithAddressModel>): Mono<ErrorModel<Boolean>> {
        return Flux.fromIterable(events)

            .map {

                if (it.description == null || it.date == null || it.name == null || it.cityId == null) {

                    log.error("Some fields are empty")
                    throw Exception("Пропущено заполнение обязательных полей!")
                }

                val newExpiredStatus: Boolean = if (it.date!!.isBefore(LocalDateTime.now())) {
                    DEFAULT_EXPIRED_STATUS
                } else {
                    ACTIVE_EXPIRED_STATUS
                }

                println(newExpiredStatus)

                val convertedAddressModel = converter.fromEventAddressToAddressModel(it)
                val newAddressModel = blockingAddressRepository.create(convertedAddressModel)

                if ((it.street == null || it.house == null) && it.publicPlaceName == null) {
                    log.error("Address or publicPlaceName must be initialize!")
                    throw Exception("Поля адреса, либо место проведения мероприятия должны быть заполнены!")
                }

                val newEventModel = converter.fromEventAddressToEventModel(it, newAddressModel?.id, newExpiredStatus)

                val newEventRecord = dsl.newRecord(EVENT, newEventModel)
                newEventRecord.apply { newEventRecord.reset(EVENT.ID) }
            }
            .map { r ->
                dsl.insertQuery(EVENT)
                    .apply { setRecord(r) }
            }
            .collectList()
            .map {
                return@map ErrorModel(
                    dsl.batch(it)
                        .execute().asList().isNotEmpty(), null
                )
            }
    }

    fun updateAllEventsModelsInfo(events: List<EventWithAddressModel>): Mono<ErrorModel<Boolean>> {
        return Flux.fromIterable(events)
            .map { eventModel ->
=======
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
>>>>>>> origin/main
                if (eventModel.id == null) {
                    log.error("Field id in event update end-point is empty!")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }
                val pastEventModel: EventModel? = blockingEventRepository.getEventBlockingById(eventModel.id!!)
                if (pastEventModel == null) {
                    log.error("Updatable event doesn't exist! Check event id")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }
<<<<<<< HEAD

                val convertedAddressModel: AddressModel =
                    converter.fromEventAddressToAddressModel(eventModel, pastEventModel.addressId)

                if (convertedAddressModel != defaultAddressModel) {
                    blockingAddressRepository.update(convertedAddressModel)
                }

=======
>>>>>>> origin/main
                val newExpiredStatus: Boolean = if (eventModel.date != null) {
                    if (eventModel.date!!.isBefore(LocalDateTime.now())) {
                        DEFAULT_EXPIRED_STATUS
                    } else {
                        ACTIVE_EXPIRED_STATUS
                    }
                } else {
                    pastEventModel.isExpired!!
                }
<<<<<<< HEAD

=======
                val newEventModel = converter.fromModel(eventModel)
>>>>>>> origin/main
                println(newExpiredStatus)
                dsl.update(EVENT)
                    .set(EVENT.DATE, eventModel.date ?: pastEventModel.date)
                    .set(EVENT.DESCRIPTION, eventModel.description ?: pastEventModel.description)
                    .set(EVENT.IS_EXPIRED, newExpiredStatus)
                    .set(EVENT.MAIN_GOAL, eventModel.mainGoal ?: pastEventModel.mainGoal)
                    .set(EVENT.NAME, eventModel.name ?: pastEventModel.name)
                    .set(EVENT.PHONE_NUMBER, eventModel.phoneNumber ?: pastEventModel.phoneNumber)
                    .set(EVENT.PUBLIC_PLACE_NAME, eventModel.publicPlaceName ?: pastEventModel.publicPlaceName)
                    .set(EVENT.SITE, eventModel.site ?: pastEventModel.site)
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
                        EVENT.DATE.ge(LocalDateTime.now())
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