package com.fs.client.controller

import com.fs.client.repository.CompanyRepository
import com.fs.service.ru.CompanyModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
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
        return companyRepository.getById(id)
    }

    @QueryMapping
    open fun getAllCompanies(): Flux<CompanyModel> {
        return companyRepository.getAll()
    }

    @QueryMapping
    open fun getAllCompaniesByPositionId(@Argument id: Long): Flux<CompanyModel> {
        return companyRepository.getAllByPositionId(id)
    }

    @QueryMapping
    open fun getAllCompaniesByCountryCode(@Argument code: Long): Flux<CompanyModel> {
        return companyRepository.getAllByCountryCode(code)
    }

    @QueryMapping
    open fun getAllCompaniesByCityId(@Argument id: Long): Flux<CompanyModel> {
        return companyRepository.getAllByCityId(id)
    }

    @MutationMapping
    open fun addCompany(@Argument company: CompanyModel): Mono<CompanyModel> {
        return companyRepository.insert(company)
    }

    @MutationMapping
    open fun addCompanyByPartner(
        @Argument partnerId: Long,
        @Argument company: CompanyModel
    ): Mono<CompanyModel> {
        return companyRepository.insertByPartner(partnerId, company)
    }

    @MutationMapping
    open fun updateCompany(@Argument company: CompanyModel): Mono<Boolean> {
        return companyRepository.update(company)
    }

    @MutationMapping
    open fun deleteCompany(@Argument id: Long): Mono<Boolean> {
        return companyRepository.delete(id)
    }
}