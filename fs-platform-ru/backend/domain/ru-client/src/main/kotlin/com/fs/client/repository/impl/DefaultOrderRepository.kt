package com.fs.client.repository.impl

import com.fs.client.repository.OrderRepository
import com.fs.client.service.OrderModelConverter
import com.fs.client.service.TotalPriceMatcher
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    basketRepository: DefaultBasketRepository,
    serviceRepository: DefaultServiceRepository,
    cityRepository: DefaultCityRepository,
    totalPriceMatcher: TotalPriceMatcher
) : OrderRepository(
    dsl, converter, basketRepository, serviceRepository, cityRepository, totalPriceMatcher
)