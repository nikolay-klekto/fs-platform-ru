package com.fs.client.repository.impl

import com.fs.client.converter.CityModelConverter
import com.fs.client.converter.DateTimeConverterService
import com.fs.client.converter.EventModelConverter
import com.fs.client.repository.EventRepository
import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.service.GoogleCalendarEventService
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultEventRepository(
    dsl: DSLContext,
    converter: EventModelConverter,
    eventBlockingRepository: EventBlockingRepository,
    cityModelConverter: CityModelConverter,
    googleCalendarService: GoogleCalendarEventService,
    dateTimeConverterService: DateTimeConverterService
) : EventRepository(
    dsl, converter, cityModelConverter, eventBlockingRepository,
    googleCalendarService, dateTimeConverterService
)