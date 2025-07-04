package com.fs.client.controller

import com.fs.client.repository.OrdersDatesRepository
import com.fs.domain.jooq.tables.pojos.OrderDates
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class OrderDatesController(
    private val repository: OrdersDatesRepository
) {

    @MutationMapping
    suspend fun insertOrderDate(@Argument orderDate: OrderDates): OrderDates {
        return repository.insertOrderDate(orderDate)
    }

    @QueryMapping
    suspend fun getOrderDatesByProfessionCompanyId(@Argument companyProfessionId: Long): List<OrderDates> {
        return repository.getOrderDatesByProfessionCompanyId(companyProfessionId)
    }
}
