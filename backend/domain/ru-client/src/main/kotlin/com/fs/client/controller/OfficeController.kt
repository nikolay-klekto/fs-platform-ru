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
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Office")
@RestController
@RequestMapping("/office", produces = ["application/json"])
class OfficeController(open val officeRepository: OfficeRepository) {

//    @GetMapping("company/{id}")
//    fun getByCompanyId(@PathVariable("id") companyId: Long) =
//        officeRepository.getAllByCompanyId(companyId)
//
//    @GetMapping("{id}")
//    fun getByOfficeId(@PathVariable("id") officeId: Long) =
//        officeRepository.getOfficeById(officeId)
//
//    @PutMapping("{id}")
//    fun updateByOfficeId(
//        @RequestBody companyAddress: CompanyAddress
//    ) =
//        officeRepository.updateCompanyAddress(companyAddress)
//
//
//    @PostMapping
//    fun insertOfficeAddress(
//        @RequestBody companyAddress: CompanyAddress
//    ) =
//        officeRepository.insert(companyAddress)
//
//    @DeleteMapping("{id}")
//    fun deleteByCompanyId(@PathVariable companyId: Long) =
//        officeRepository.deleteAllByCompanyId(companyId)

    @QueryMapping
    fun getOffice(@Argument id: Long): Mono<OfficeModel> {
        return officeRepository.getOfficeById(id)
    }

    @QueryMapping
    fun getAllOfficesByCompanyId(@Argument id: Long): Flux<OfficeModel> {
        return officeRepository.getAllByCompanyId(id)
    }

    @MutationMapping
    fun updateOfficeAddress(
        @Argument companyAddress: CompanyAddress
    ): Mono<Boolean> {
        return officeRepository.updateCompanyAddress(companyAddress)
    }

    @MutationMapping
    fun addOfficeAddress(
        @Argument companyAddress: CompanyAddress
    ): Mono<OfficeModel> {
        return officeRepository.insert(companyAddress)
    }

    @MutationMapping
    fun deleteAllOfficesByCompanyId(@Argument id: Long): Mono<Boolean> {
        return officeRepository.deleteAllByCompanyId(id)
    }

    @MutationMapping
    fun deleteOffice(@Argument id: Long): Mono<Boolean> {
        return officeRepository.deleteByOfficeId(id)
    }

    @SchemaMapping(typeName = "Order", field = "office")
    fun getOfficeForOrder(order: OrderModel): Mono<OfficeModel> {
        return officeRepository.getOfficeById(order.companyOfficeId!!)
    }
}
