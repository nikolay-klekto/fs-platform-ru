package com.fs.client.controller

import com.fs.client.repository.InternshipTypeRepository
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipPricesModel
import com.fs.service.ru.InternshipTypeModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "InternshipType")
@RestController
@RequestMapping("/internshipType", produces = ["application/json"])
class InternshipTypeController(
    private val internshipTypeRepository: InternshipTypeRepository
) {

    @MutationMapping
    suspend fun addInternshipType(@Argument internshipType: InternshipTypeModel): InternshipTypeModel {
        return internshipTypeRepository.insert(internshipType)
    }

    @MutationMapping
    suspend fun updateInternshipTypeById(
        @Argument id: Long,
        @Argument internshipType: InternshipTypeModel
    ): Boolean {
        return internshipTypeRepository.updateServiceById(id, internshipType)
    }

    @MutationMapping
    suspend fun deleteInternshipTypeById(@Argument id: Long): Boolean {
        return internshipTypeRepository.deleteByID(id)
    }

    @QueryMapping
    suspend fun getInternshipTypeById(@Argument id: Long): InternshipTypeModel? {
        return internshipTypeRepository.getInternshipTypeById(id)
    }

    @QueryMapping
    suspend fun getAllInternshipTypes(): List<InternshipTypeModel> {
        return internshipTypeRepository.getAllInternshipTypes()
    }

    @SchemaMapping(typeName = "CompanyProfession", field = "internshipType")
    suspend fun getInternshipTypeForCompanyProfession(companyProfessionModel: CompanyProfessionModel): InternshipTypeModel? {
        return internshipTypeRepository.getInternshipTypeById(companyProfessionModel.internshipTypeId!!)
    }

    @SchemaMapping(typeName = "InternshipPricesModel", field = "internshipType")
    suspend fun getInternshipTypeForInternshipPriceModel(internshipPriceModel: InternshipPricesModel): InternshipTypeModel? {
        return internshipTypeRepository.getInternshipTypeById(internshipPriceModel.internshipTypeId!!)
    }
}
