package com.fs.client.repository.impl

import com.fs.client.repository.*
import com.fs.client.service.OrderModelConverter
import com.fs.client.service.TotalPriceMatcher
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    basketRepository: BasketRepository,
    serviceRepository: ServiceRepository,
    cityRepository: CityRepository,
    countryRepository: CountryRepository,
    totalPriceMatcher: TotalPriceMatcher
) : OrderRepository(
    dsl, converter, basketRepository, serviceRepository, cityRepository, countryRepository, totalPriceMatcher
)