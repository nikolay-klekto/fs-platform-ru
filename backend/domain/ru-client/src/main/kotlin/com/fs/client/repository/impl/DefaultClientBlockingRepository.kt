package com.fs.client.repository.impl

import com.fs.client.repository.OrderRepository
import com.fs.client.repository.blocked.BasketBlockingRepository
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.converter.ClientModelConverter
import com.fs.client.service.PasswordService
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultClientBlockingRepository(
    dsl: DSLContext,
    converter: ClientModelConverter,
    basketBlockingRepository: BasketBlockingRepository,
    encoder: PasswordService,
    orderRepository: OrderRepository
) : ClientBlockingRepository(dsl, converter, basketBlockingRepository, encoder, orderRepository)