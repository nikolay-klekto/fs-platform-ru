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
    open fun companyById(@Argument companyId: Long): Mono<CompanyModel> {
        return companyRepository.getById(companyId)
    }

    @QueryMapping
    open fun getAllCompanies(): Flux<CompanyModel> {
        return companyRepository.getAll()
    }

    @QueryMapping
    open fun getAllCompaniesByPositionId(@Argument positionId: Long): Flux<CompanyModel> {
        return companyRepository.getAllByPositionId(positionId)
    }

    @QueryMapping
    open fun getAllCompaniesByCountryCode(@Argument countryCode: Long): Flux<CompanyModel> {
        return companyRepository.getAllByCountryCode(countryCode)
    }

    @QueryMapping
    open fun getAllCompaniesByCityId(@Argument cityId: Long): Flux<CompanyModel> {
        return companyRepository.getAllByCityId(cityId)
    }

    @MutationMapping
    open fun addCompany(@Argument companyModel: CompanyModel): Mono<CompanyModel> {
        return companyRepository.insert(companyModel)
    }

    @MutationMapping
    open fun addCompanyByPartner(
        @Argument partnerId: Long,
        @Argument companyModel: CompanyModel
    ): Mono<CompanyModel> {
        return companyRepository.insertByPartner(partnerId, companyModel)
    }

    @MutationMapping
    open fun updateCompany(@Argument companyModel: CompanyModel): Mono<Boolean> {
        return companyRepository.update(companyModel)
    }

    @MutationMapping
    open fun deleteCompany(@Argument companyId: Long): Mono<Boolean> {
        return companyRepository.delete(companyId)
    }
}