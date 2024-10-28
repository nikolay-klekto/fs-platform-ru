package com.fs.client.controller

import com.fs.client.repository.CompanyProfessionRepository
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipTypeModel
import com.fs.service.ru.OrderModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

open class CompanyProfessionController(
    private val companyProfessionRepository: CompanyProfessionRepository
) {

    @QueryMapping
    open fun getLowestPriceByInternshipTypeId(@Argument internshipTypeId: Long): Mono<Double> {
        return companyProfessionRepository.getLowestPriceByInternshipTypeId(internshipTypeId)
    }

    @SchemaMapping(typeName = "Order", field = "companyProfession")
    fun getCompanyProfessionForOrder(orderModel: OrderModel): Mono<CompanyProfessionModel> {
        return companyProfessionRepository.getCompanyProfessionById(orderModel.companyProfessionId!!)
    }
}