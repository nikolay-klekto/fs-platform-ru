package com.fs.client.controller

import com.fs.client.repository.InternshipTypeRepository
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.InternshipPricesModel
import com.fs.service.ru.OrderModel
import com.fs.service.ru.InternshipTypeModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "InternshipType")
@RestController
@RequestMapping("/internshipType", produces = ["application/json"])
open class InternshipTypeController(
    open val internshipTypeRepository: InternshipTypeRepository
) {

    @GetMapping("{id}")
    fun getServiceByID(@PathVariable("id") serviceId: Long) =
        internshipTypeRepository.getInternshipTypeById(serviceId)

    @GetMapping
    fun getAllServicesModel() = internshipTypeRepository.getAllInternshipTypes()

    @PutMapping("{id}")
    fun updateServiceModelByID(
        @RequestBody internshipTypeModel: InternshipTypeModel,
        @PathVariable("id") id: Long
    ) =
        internshipTypeRepository.updateServiceById(id, internshipTypeModel)

    @DeleteMapping("{id}")
    fun deleteServiceByID(@PathVariable("id") id: Long) =
        internshipTypeRepository.deleteByID(id)

    @PostMapping
    fun insertServiceModel(@RequestBody internshipTypeModel: InternshipTypeModel) =
        internshipTypeRepository.insert(internshipTypeModel)

    @MutationMapping
    open fun addInternshipType(@Argument internshipType: InternshipTypeModel): Mono<InternshipTypeModel> {
        return internshipTypeRepository.insert(internshipType)
    }

    @MutationMapping
    open fun updateInternshipTypeById(
        @Argument id: Long,
        @Argument internshipType: InternshipTypeModel
    ): Mono<Boolean> {
        return internshipTypeRepository.updateServiceById(id, internshipType)
    }

    @MutationMapping
    open fun deleteInternshipTypeById(@Argument id: Long): Mono<Boolean> {
        return internshipTypeRepository.deleteByID(id)
    }

    @QueryMapping
    open fun getInternshipTypeById(@Argument id: Long): Mono<InternshipTypeModel> {
        return internshipTypeRepository.getInternshipTypeById(id)
    }

    @QueryMapping
    open fun getAllInternshipTypes(): Flux<InternshipTypeModel> {
        return internshipTypeRepository.getAllInternshipTypes()
    }

    @SchemaMapping(typeName = "CompanyProfession", field = "internshipType")
    fun getInternshipTypeForCompanyProfession(companyProfessionModel: CompanyProfessionModel): Mono<InternshipTypeModel> {
        return internshipTypeRepository.getInternshipTypeById(companyProfessionModel.internshipTypeId!!)
    }

    @SchemaMapping(typeName = "InternshipPricesModel", field = "internshipType")
    fun getInternshipTypeForInternshipPriceModel(internshipPriceModel: InternshipPricesModel): Mono<InternshipTypeModel> {
        return internshipTypeRepository.getInternshipTypeById(internshipPriceModel.internshipTypeId!!)
    }
}