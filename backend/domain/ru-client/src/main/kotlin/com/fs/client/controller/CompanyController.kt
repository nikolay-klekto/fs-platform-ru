package com.fs.client.controller

import com.fs.client.repository.CompanyRepository
import com.fs.client.ru.OfficeModel
import com.fs.service.ru.CompanyModel
import com.fs.service.ru.OrderModel
import com.fs.service.ru.enums.IndustryModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Company")
@RestController
@RequestMapping("/company", produces = ["application/json"])
open class CompanyController(
    open val companyRepository: CompanyRepository
) {

    @QueryMapping
    open fun getCompanyById(@Argument id: Long): Mono<CompanyModel> {
        return companyRepository.getCompanyById(id)
    }

    @QueryMapping
    open fun getAllCompaniesIndustries(): Flux<String> {
        return companyRepository.getAllCompaniesIndustries()
    }

    @QueryMapping
    open fun getAllCompanies(): Flux<CompanyModel> {
        return companyRepository.getAllCompanies()
    }

    @QueryMapping
    open fun getAllAvailableCompanies(): Flux<CompanyModel> {
        return companyRepository.getAllAvailableCompanies()
    }

    @QueryMapping
    open fun getAllCompaniesByPositionId(@Argument id: Long): Flux<CompanyModel> {
        return companyRepository.getAllCompaniesByProfessionId(id)
    }

    @QueryMapping
    open fun getAllCompaniesByCountryCode(@Argument code: Long): Flux<CompanyModel> {
        return companyRepository.getAllCompaniesByCountryCode(code)
    }

    @QueryMapping
    open fun getAllCompaniesByCityId(@Argument id: Long): Flux<CompanyModel> {
        return companyRepository.getAllCompaniesByCityId(id)
    }

    @MutationMapping
    open fun addCompany(@Argument company: CompanyModel): Mono<CompanyModel> {
        return companyRepository.insertCompany(company)
    }

    @MutationMapping
    open fun addCompanyByPartner(
        @Argument partnerId: Long,
        @Argument company: CompanyModel
    ): Mono<CompanyModel> {
        return companyRepository.insertCompanyByPartnerId(partnerId, company)
    }

    @MutationMapping
    open fun updateCompany(@Argument company: CompanyModel): Mono<Boolean> {
        return companyRepository.updateCompany(company)
    }

    @MutationMapping
    open fun deleteCompany(@Argument id: Long): Mono<Boolean> {
        return companyRepository.deleteCompany(id)
    }

    @SchemaMapping(typeName = "Order", field = "company")
    fun getCompanyForOrder(order: OrderModel): Mono<CompanyModel> {
        return companyRepository.getCompanyById(order.companyOfficeId!!)
    }

    @SchemaMapping(typeName = "Office", field = "company")
    fun getCompanyForOffice(office: OfficeModel): Mono<CompanyModel> {
        return companyRepository.getCompanyById(office.companyId!!)
    }
}