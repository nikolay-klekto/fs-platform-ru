package com.fs.client.controller

import com.fs.client.repository.OfficeRepository
import com.fs.client.ru.CompanyAddress
import com.fs.client.ru.OfficeModel
import com.fs.service.ru.OrderModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Office")
@RestController
@RequestMapping("/office", produces = ["application/json"])
class OfficeController(private val officeRepository: OfficeRepository) {

    @QueryMapping
    suspend fun getOffice(@Argument id: Long): OfficeModel? {
        return officeRepository.getOfficeById(id)
    }

    @QueryMapping
    suspend fun getAllOfficesByCompanyId(@Argument id: Long): List<OfficeModel> {
        return officeRepository.getAllByCompanyId(id)
    }

    @MutationMapping
    suspend fun updateOfficeAddress(
        @Argument companyAddress: CompanyAddress
    ): Boolean {
        return officeRepository.updateCompanyAddress(companyAddress)
    }

    @MutationMapping
    suspend fun addOfficeAddress(
        @Argument companyAddress: CompanyAddress
    ): OfficeModel {
        return officeRepository.insert(companyAddress)
    }

    @MutationMapping
    suspend fun deleteAllOfficesByCompanyId(@Argument id: Long): Boolean {
        return officeRepository.deleteAllByCompanyId(id)
    }

    @MutationMapping
    suspend fun deleteOffice(@Argument id: Long): Boolean {
        return officeRepository.deleteByOfficeId(id)
    }

    @SchemaMapping(typeName = "Order", field = "office")
    suspend fun getOfficeForOrder(order: OrderModel): OfficeModel? {
        return officeRepository.getOfficeById(order.companyOfficeId!!)
    }
}
