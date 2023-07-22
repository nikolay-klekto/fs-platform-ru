package com.fs.client.repository

import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.service.EventModelConverter
import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.errors.ErrorModel
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDateTime

abstract class EventRepository(
    open val dsl: DSLContext,
    open val converter: EventModelConverter,
    open val blockingEventRepository: EventBlockingRepository
) {
    fun getByEventId(id: Long): Mono<EventModel>{
        return Mono.fromSupplier {
            blockingEventRepository.getEventBlockingById(id)
        }
    }

    fun getAllEvents(): Flux<EventModel>{
        return Flux.from(
            dsl.select(EVENT.asterisk()).from(EVENT)
        )
            .map {it.into(Event::class.java)}
            .map(converter::toModel)
    }

    fun getAllActualEvents(): Flux<EventModel>{
        return Flux.from(
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS))
        )
            .map {it.into(Event::class.java)}
            .map(converter::toModel)
    }

    fun getAllActualEventsByCityId(cityId: Long): Flux<EventModel>{
        return Flux.from(
            dsl.select(EVENT.asterisk()).from(EVENT)
                .where(EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS)
                    .and(EVENT.CITY_ID.eq(cityId)))
        )
            .map {it.into(Event::class.java)}
            .map(converter::toModel)
    }

    fun insertAllEvents(events: List<EventModel>): Mono<ErrorModel<Boolean>> {
        return Flux.fromIterable(events)

            .map{

                if(it.cityId == null || it.description == null || it.endDate == null ||
                    it.name == null){
                    log.error("Some fields are empty")
                    throw Exception("Пропущено заполнение обязательных полей!")
                }

                if(it.startDate != null && it.startDate!!.isAfter(it.endDate)){
                    log.error("Start event date is after end date!")
                    throw Exception("Время начала мероприятия позже времени конца!" +
                            " Ппроверьте пожалуйста введённые данные и введите их ещё раз.")
                }

                val newExpiredStatus: Boolean = if(it.endDate!!.isAfter(LocalDateTime.now())){
                    DEFAULT_EXPIRED_STATUS
                }else{
                    ACTIVE_EXPIRED_STATUS
                }

                val newEventModel = EventModel(
                    id = defaultEvent.id,
                    cityId = it.cityId,
                    description = it.description,
                    endDate = it.endDate,
                    isExpired = newExpiredStatus,
                    mainGoal = it.mainGoal?: defaultEvent.mainGoal,
                    name = it.name,
                    startDate = it.startDate
                )

                val newEventRecord = dsl.newRecord(EVENT, newEventModel)
                newEventRecord.apply { newEventRecord.reset(EVENT.ID) }
            }
                    .map { r ->
                        dsl.insertQuery(EVENT)
                            .apply { setRecord(r) }
            }
            .collectList()
            .map{
                return@map ErrorModel(dsl.batch(it)
                    .execute().asList().isNotEmpty(), null)
            }
    }

    fun updateAllEventsModelsInfo(events: List<EventModel>): Mono<ErrorModel<Boolean>>{
        return Flux.fromIterable(events)
            .map {eventModel ->
                if(eventModel.id == null){
                    log.error("Field id in event update end-point is empty!")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }
                val pastEventModel: EventModel? = blockingEventRepository.getEventBlockingById(eventModel.id!!)
                if(pastEventModel == null){
                    log.error("Updatable event doesn't exist! Check event id")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }

                val newEventEndDate = eventModel.endDate?: pastEventModel.endDate
                val newEventStartDate: LocalDateTime? = if(eventModel.startDate == null){
                    if(pastEventModel.startDate == null){
                        null
                    }else{
                        pastEventModel.startDate
                    }
                }else{
                    eventModel.startDate
                }

                if(newEventStartDate!= null && newEventStartDate.isAfter(newEventEndDate)){
                    log.error("Start event date is after end date!")
                    throw Exception("Время начала мероприятия позже времени конца!" +
                            " Ппроверьте пожалуйста введённые данные и введите их ещё раз.")
                }

                dsl.update(EVENT)
                    .set(EVENT.CITY_ID, eventModel.cityId?: pastEventModel.cityId)
                    .set(EVENT.DESCRIPTION, eventModel.description?: pastEventModel.description)
                    .set(EVENT.END_DATE, newEventEndDate)
                    .set(EVENT.MAIN_GOAL, eventModel.mainGoal?: pastEventModel.mainGoal)
                    .set(EVENT.NAME, eventModel.name?: pastEventModel.name)
                    .set(EVENT.START_DATE, newEventStartDate)
                    .where(EVENT.ID.eq(eventModel.id))
                    .execute() == 1
            }.collectList()
            .flatMap{list ->
                if(list.isEmpty()){
                    return@flatMap Mono.just(ErrorModel(false, null))
                }
                var result = true
                list.forEach {
                    if(it == false) {
                        result = it
                    }
                }
                return@flatMap Mono.just(ErrorModel(result, null))

            }
    }

    fun updateExpiredEventsStatus(): Mono<Boolean> {
        log.info("Scheduler is working. Date and time is: " + LocalDateTime.now())
        return Mono.fromSupplier {
            dsl.update(EVENT)
            .set(EVENT.IS_EXPIRED, DEFAULT_EXPIRED_STATUS)
            .where(
                EVENT.IS_EXPIRED.eq(ACTIVE_EXPIRED_STATUS).and(
                    EVENT.END_DATE.ge(LocalDateTime.now())
                )
            ).execute() > 0
        }
    }

    fun deleteEvent(eventId: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(EVENT)
                .where(EVENT.ID.eq(eventId))
                .execute() == 1
        }
    }

    fun deleteAllEvents(): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(EVENT)
            .execute() > 0
        }
    }

    fun deleteAllExpiredEvents(): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(EVENT)
                .where(EVENT.IS_EXPIRED.eq(DEFAULT_EXPIRED_STATUS))
                .execute() > 0
        }
    }

    companion object{
        private val log = LogManager.getLogger()
        private const val ACTIVE_EXPIRED_STATUS: Boolean = false
        private const val DEFAULT_EXPIRED_STATUS: Boolean = true
        private val defaultEvent = EventModel(
            id = 1,
            cityId = null,
            description = "",
            endDate = null,
            isExpired = DEFAULT_EXPIRED_STATUS,
            mainGoal = "",
            name = "",
            startDate = null
        )

    }
}