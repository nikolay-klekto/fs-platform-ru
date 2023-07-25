package com.fs.client.repository.impl

import com.fs.client.repository.*
import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.CountryBlockingRepository
import com.fs.client.repository.blocked.OrderBlockingRepository
import com.fs.client.repository.blocked.ServiceBlockingRepository
import com.fs.client.service.OrderModelConverter
import com.fs.client.service.TotalPriceMatcher
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultOrderRepository(
    dsl: DSLContext,
    converter: OrderModelConverter,
    serviceBlockingRepository: ServiceBlockingRepository,
    cityRepository: CityRepository,
    countryBlockingRepository: CountryBlockingRepository,
    basketBlockingRepository: BasketBlockingRepository,
    totalPriceMatcher: TotalPriceMatcher,
    orderBlockingRepository: OrderBlockingRepository
) : OrderRepository(dsl, converter, serviceBlockingRepository, cityRepository,
    countryBlockingRepository, basketBlockingRepository, totalPriceMatcher,orderBlockingRepository)