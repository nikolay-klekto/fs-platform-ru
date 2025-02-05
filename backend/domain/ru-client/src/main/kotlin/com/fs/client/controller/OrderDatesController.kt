package com.fs.client.controller

import com.fs.client.repository.JobRequestsRepository
import com.fs.client.repository.OrdersDatesRepository
import com.fs.client.repository.ProfessionsCompaniesFeedbackRepository
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.domain.jooq.tables.pojos.JobRequests
import com.fs.domain.jooq.tables.pojos.OrderDates
import com.fs.domain.jooq.tables.pojos.ProfessionsCompaniesFeedback
import com.fs.service.ru.CompanyProfessionModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class OrderDatesController(
    open val repository: OrdersDatesRepository
) {

    @MutationMapping
    fun insertOrderDate(@Argument orderDate: OrderDates): Mono<OrderDates> {
        return repository.insertOrderDate(orderDate)
    }

    @QueryMapping
    open fun getOrderDatesByProfessionCompanyId(@Argument companyProfessionId: Long): Flux<OrderDates> {
        return repository.getOrderDatesByProfessionCompanyId(companyProfessionId)
    }
}