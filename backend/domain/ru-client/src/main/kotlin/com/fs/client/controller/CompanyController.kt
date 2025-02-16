package com.fs.client.controller

import com.fs.client.repository.CompanyRepository
import com.fs.client.ru.OfficeModel
import com.fs.service.ru.CompanyModel
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.OrderModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Company")
@RestController
@RequestMapping("/company", produces = ["application/json"])
class CompanyController(
    private val companyRepository: CompanyRepository
) {

    @QueryMapping
    suspend fun getCompanyById(@Argument id: Long): CompanyModel? {
        return companyRepository.getCompanyById(id)
    }

    @QueryMapping
    suspend fun getAllCompaniesIndustries(): List<String> {
        return companyRepository.getAllCompaniesIndustries()
    }

    @QueryMapping
    suspend fun getAllCompanies(): List<CompanyModel> {
        return companyRepository.getAllCompanies()
    }

    @QueryMapping
    suspend fun getAllAvailableCompanies(): List<CompanyModel> {
        return companyRepository.getAllAvailableCompanies()
    }

    @QueryMapping
    suspend fun getAllCompaniesByProfessionId(@Argument id: Long): List<CompanyModel> {
        return companyRepository.getAllCompaniesByProfessionId(id)
    }

    @QueryMapping
    suspend fun getAllCompaniesByCountryCode(@Argument code: Long): List<CompanyModel> {
        return companyRepository.getAllCompaniesByCountryCode(code)
    }

    @QueryMapping
    suspend fun getAllCompaniesByCityId(@Argument id: Long): List<CompanyModel> {
        return companyRepository.getAllCompaniesByCityId(id)
    }

    @MutationMapping
    suspend fun addCompany(@Argument company: CompanyModel): CompanyModel {
        return companyRepository.insertCompany(company)
    }

    @MutationMapping
    suspend fun addCompanyByPartner(
        @Argument partnerId: Long,
        @Argument company: CompanyModel
    ): CompanyModel {
        return companyRepository.insertCompanyByPartnerId(partnerId, company)
    }

    @MutationMapping
    suspend fun updateCompany(@Argument company: CompanyModel): Boolean {
        return companyRepository.updateCompany(company)
    }

    @MutationMapping
    suspend fun deleteCompany(@Argument id: Long): Boolean {
        return companyRepository.deleteCompany(id)
    }

    @SchemaMapping(typeName = "Order", field = "company")
    suspend fun getCompanyForOrder(order: OrderModel): CompanyModel? {
        return companyRepository.getCompanyById(order.companyOfficeId!!)
    }

    @SchemaMapping(typeName = "Office", field = "company")
    suspend fun getCompanyForOffice(office: OfficeModel): CompanyModel? {
        return companyRepository.getCompanyById(office.companyId!!)
    }

    @SchemaMapping(typeName = "CompanyProfession", field = "company")
    suspend fun getCompanyForCompanyProfession(companyProfession: CompanyProfessionModel): CompanyModel? {
        return companyRepository.getCompanyById(companyProfession.companyId!!)
    }
}
