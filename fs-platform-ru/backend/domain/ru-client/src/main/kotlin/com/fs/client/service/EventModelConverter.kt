package com.fs.client.service

import com.fs.client.repository.EventRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.CompanyAddress
import com.fs.client.ru.OfficeModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.EventWithAddressModel
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

    fun fromEventAddressToAddressModel(eventWithAddress: EventWithAddressModel, addressId: Long? = null): AddressModel {
        return AddressModel(
            addressId?: defaultAddressModel.id,
            eventWithAddress.cityId,
            eventWithAddress.apartment,
            eventWithAddress.building,
            eventWithAddress.house,
            eventWithAddress.street
        )
    }

    fun fromEventAddressToEventModel(
        eventWithAddress: EventWithAddressModel,
        newAddressId: Long?,
        isExpiredStatus: Boolean
    ): EventModel {
        return EventModel(
            defaultEventModel.id,
            newAddressId,
            eventWithAddress.date,
            eventWithAddress.description,
            isExpiredStatus,
            eventWithAddress.mainGoal?: defaultEventModel.mainGoal,
            eventWithAddress.name,
            eventWithAddress.phoneNumber,
            eventWithAddress.publicPlaceName,
            eventWithAddress.site
        )
    }

    companion object {

        private const val DEFAULT_EXPIRED_STATUS: Boolean = true

        public val defaultAddressModel =
            AddressModel(1, null, null, null, null, null)

        private val defaultEventModel = EventModel(
            id = 1,
            addressId = null,
            date = null,
            description = "",
            isExpired = DEFAULT_EXPIRED_STATUS,
            mainGoal = "",
            name = "",
            phoneNumber = null,
            publicPlaceName = null,
            site = null
        )
    }
}
