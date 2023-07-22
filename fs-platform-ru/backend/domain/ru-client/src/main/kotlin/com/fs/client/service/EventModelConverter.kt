package com.fs.client.service

import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import org.springframework.stereotype.Service


@Service
class EventModelConverter: ModelConverter<Event, EventModel> {
    override fun toModel(rawObject: Event): EventModel {
        return EventModel(
            id = rawObject.id,
            addressId  = rawObject.addressId,
            date = rawObject.date,
            description = rawObject.description,
            isExpired = rawObject.isExpired,
            mainGoal = rawObject.mainGoal,
            name = rawObject.name,
            phoneNumber = rawObject.phoneNumber,
            publicPlaceName  = rawObject.publicPlaceName,
            site = rawObject.site
        )
    }

    override fun fromModel(modelObject: EventModel): Event {
        return Event(
            modelObject.id,
            modelObject.addressId,
            modelObject.date,
            modelObject.description,
            modelObject.isExpired,
            modelObject.mainGoal,
            modelObject.name,
            modelObject.phoneNumber,
            modelObject.publicPlaceName,
            modelObject.site
        )
    }
}
