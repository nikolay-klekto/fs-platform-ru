package com.fs.client.controller

import com.fs.client.repository.CompanyProfessionRepository
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipPricesModel
import com.fs.service.ru.InternshipTypeModel
import com.fs.service.ru.OrderModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
open class CompanyProfessionController(
    private val companyProfessionRepository: CompanyProfessionRepository
) {

    @QueryMapping
    open fun getLowestPricesByInternshipTypes(): Flux<InternshipPricesModel> {
        return companyProfessionRepository.getLowestPricesByInternshipTypes()
    }

    @SchemaMapping(typeName = "Order", field = "companyProfession")
    fun getCompanyProfessionForOrder(orderModel: OrderModel): Mono<CompanyProfessionModel> {
        return companyProfessionRepository.getCompanyProfessionById(orderModel.companyProfessionId!!)
    }
}