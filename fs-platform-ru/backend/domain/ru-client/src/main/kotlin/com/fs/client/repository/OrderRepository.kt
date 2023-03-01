package com.fs.client.repository

import com.fs.client.service.OrderModelConverter
import org.jooq.DSLContext

abstract class OrderRepository(
    open val dsl: DSLContext,
    open val converter: OrderModelConverter
) {
}