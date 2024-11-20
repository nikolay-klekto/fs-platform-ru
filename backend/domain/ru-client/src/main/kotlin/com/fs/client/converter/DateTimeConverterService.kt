package com.fs.client.converter

import com.google.api.client.util.DateTime
import com.google.api.services.calendar.model.EventDateTime
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId

@Service
class DateTimeConverterService {
    fun convertToEventDateTime(localDateTime: LocalDateTime): EventDateTime {
        val zoneId = ZoneId.systemDefault()
        val zonedDateTime = localDateTime.atZone(zoneId)
        val dateTime = DateTime(zonedDateTime.toInstant().toEpochMilli())
        return EventDateTime().setDateTime(dateTime).setTimeZone(zoneId.id)
    }
}

