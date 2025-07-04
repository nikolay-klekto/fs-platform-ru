package com.fs.client.controller

import com.fs.client.repository.CompanyProfessionRepository
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipPricesModel
import com.fs.service.ru.OrderModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CompanyProfessionController(
    private val companyProfessionRepository: CompanyProfessionRepository
) {

    @QueryMapping
    suspend fun getLowestPricesByInternshipTypes(): List<InternshipPricesModel> {
        return companyProfessionRepository.getLowestPricesByInternshipTypes()
    }

    @QueryMapping
    suspend fun getInternshipTypesAndPricesByCompanyProfessionId(
        @Argument companyId: Long,
        @Argument professionId: Long
    ): List<InternshipPricesModel> {
        return companyProfessionRepository.getInternshipTypesAndPricesByCompanyProfessionId(
            companyId,
            professionId
        )
    }

    @SchemaMapping(typeName = "Order", field = "companyProfession")
    suspend fun getCompanyProfessionForOrder(orderModel: OrderModel): CompanyProfessionModel? {
        return companyProfessionRepository.getCompanyProfessionById(orderModel.companyProfessionId!!)
    }
}
