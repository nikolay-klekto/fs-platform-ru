package com.fs.client.repository.impl

import com.fs.client.repository.EventRepository
import com.fs.client.repository.blocked.AddressBlockingRepository
import com.fs.client.repository.blocked.EventBlockingRepository
import com.fs.client.service.EventModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultEventRepository(
    dsl: DSLContext,
    converter: EventModelConverter,
    eventBlockingRepository: EventBlockingRepository,
    addressBlockingRepository: AddressBlockingRepository
) : EventRepository(dsl, converter, eventBlockingRepository, addressBlockingRepository) {
}