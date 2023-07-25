package com.fs.client.repository

import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.ru.AddressModel
import com.fs.client.service.EventModelConverter
import com.fs.client.service.EventModelConverter.Companion.defaultAddressModel
import com.fs.domain.jooq.tables.Address.Companion.ADDRESS
import com.fs.domain.jooq.tables.Event.Companion.EVENT
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.EventWithAddressModel
import com.fs.service.ru.errors.ErrorModel
import org.apache.logging.log4j.LogManager
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDateTime

abstract class EventRepository(
    open val dsl: DSLContext,
    open val converter: EventModelConverter,
    open val blockingEventRepository: EventBlockingRepository,
    open val blockingAddressRepository: AddressBlockingRepository
) {
    fun getEventById(id: Long): Mono<EventModel> {
        return Mono.fromSupplier {
            blockingEventRepository.getEventBlockingById(id)
        }
    }

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

    fun getAllActualEventsByCityId(cityId: Long): Flux<EventModel> {
        return Flux.from(
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
        )
            .map { it.into(Event::class.java) }
            .map(converter::toModel)
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
                if (eventModel.id == null) {
                    log.error("Field id in event update end-point is empty!")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }
                val pastEventModel: EventModel? = blockingEventRepository.getEventBlockingById(eventModel.id!!)
                if (pastEventModel == null) {
                    log.error("Updatable event doesn't exist! Check event id")
                    throw Exception("Проблемы в frontend части! Обратитесь пожалуйста в тех поддержку.")
                }

                val convertedAddressModel: AddressModel =
                    converter.fromEventAddressToAddressModel(eventModel, pastEventModel.addressId)

                if (convertedAddressModel != defaultAddressModel) {
                    blockingAddressRepository.update(convertedAddressModel)
                }

                val newExpiredStatus: Boolean = if (eventModel.date != null) {
                    if (eventModel.date!!.isBefore(LocalDateTime.now())) {
                        DEFAULT_EXPIRED_STATUS
                    } else {
                        ACTIVE_EXPIRED_STATUS
                    }
                } else {
                    pastEventModel.isExpired!!
                }

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
            }.collectList()
            .flatMap { list ->
                if (list.isEmpty()) {
                    return@flatMap Mono.just(ErrorModel(false, null))
                }
                var result = true
                list.forEach {
                    if (it == false) {
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
                        EVENT.DATE.ge(LocalDateTime.now())
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

    companion object {
        private val log = LogManager.getLogger()
        private const val ACTIVE_EXPIRED_STATUS: Boolean = false
        private const val DEFAULT_EXPIRED_STATUS: Boolean = true

    }
}