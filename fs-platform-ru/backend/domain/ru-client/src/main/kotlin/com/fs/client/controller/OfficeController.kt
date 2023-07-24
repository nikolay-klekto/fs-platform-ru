package com.fs.client.controller

import com.fs.client.repository.OfficeRepository
import com.fs.client.ru.CompanyAddress
import com.fs.client.ru.OfficeModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Office")
@RestController
@RequestMapping("/office", produces = ["application/json"])
open class OfficeController(open val officeRepository: OfficeRepository) {

    @GetMapping("company/{id}")
    fun getByCompanyId(@PathVariable("id") companyId: Long) =
        officeRepository.getAllByCompanyId(companyId)

    @GetMapping("{id}")
    fun getByOfficeId(@PathVariable("id") officeId: Long) =
        officeRepository.getOfficeById(officeId)

    @PutMapping("{id}")
    fun updateByOfficeId(
        @RequestBody companyAddress: CompanyAddress
    ) =
        officeRepository.updateCompanyAddress(companyAddress)


    @PostMapping
    fun insertOfficeAddress(
        @RequestBody companyAddress: CompanyAddress
    ) =
        officeRepository.insert(companyAddress)

    @DeleteMapping("{id}")
    fun deleteByCompanyId(@PathVariable companyId: Long) =
        officeRepository.deleteAllByCompanyId(companyId)

    @QueryMapping
    open fun getOffice(@Argument id: Long): Mono<OfficeModel> {
        return officeRepository.getOfficeById(id)
    }

    @QueryMapping
    open fun getAllOfficesByCompanyId(@Argument id: Long): Flux<OfficeModel> {
        return officeRepository.getAllByCompanyId(id)
    }

    @MutationMapping
    open fun updateOfficeAddress(
        @Argument companyAddress: CompanyAddress
    ): Mono<Boolean> {
        return officeRepository.updateCompanyAddress(companyAddress)
    }

    @MutationMapping
    open fun addOfficeAddress(
        @Argument companyAddress: CompanyAddress
    ): Mono<OfficeModel> {
        return officeRepository.insert(companyAddress)
    }

    @MutationMapping
    open fun deleteAllOfficesByCompanyId(@Argument id: Long): Mono<Boolean> {
        return officeRepository.deleteAllByCompanyId(id)
    }

    @MutationMapping
    open fun deleteOffice(@Argument id: Long): Mono<Boolean> {
        return officeRepository.deleteByOfficeId(id)
    }
}
