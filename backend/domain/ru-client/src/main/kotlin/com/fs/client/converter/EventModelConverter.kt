package com.fs.client.converter

import com.fs.client.repository.blocked.CityBlockingRepository
import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.EventWithAddressModel
import org.springframework.stereotype.Service


@Service
class EventModelConverter(
    open val cityBlockingRepository: CityBlockingRepository,
    open val eventBlockingRepository: EventBlockingRepository
) : ModelConverter<Event, EventModel> {
    override fun toModel(rawObject: Event): EventModel {
        return EventModel(
            id = rawObject.id,
            date = rawObject.date,
            description = rawObject.description,
            isExpired = rawObject.isExpired,
            name = rawObject.name,
            publicPlaceName = rawObject.publicPlaceName,
            site = rawObject.site,
            cityName = cityBlockingRepository.getCityNameById(rawObject.cityId),
            time = rawObject.time,
            organizer = rawObject.organizer,
            category = eventBlockingRepository.getEventCategoryNameById(rawObject.eventCategoryId)
        )
    }

    override fun fromModel(modelObject: EventModel): Event {
        return Event(
            modelObject.id,
            modelObject.date,
            modelObject.description,
            modelObject.isExpired,
            modelObject.name,
            modelObject.publicPlaceName,
            modelObject.site,
            cityBlockingRepository.getCityIdByName(modelObject.cityName),
            modelObject.time,
            modelObject.organizer,
            eventBlockingRepository.getEventCategoryIdByName(modelObject.category)
        )
    }

    fun fromEventAddressToAddressModel(eventWithAddress: EventWithAddressModel, addressId: Long? = null): AddressModel {
        return AddressModel(
            addressId ?: defaultAddressModel.id,
            eventWithAddress.cityId,
            eventWithAddress.apartment,
            eventWithAddress.building,
            eventWithAddress.house,
            eventWithAddress.street
        )
    }

    companion object {

        private const val DEFAULT_EXPIRED_STATUS: Boolean = true

        public val defaultAddressModel =
            AddressModel(1, null, null, null, null, null)

    }
}
