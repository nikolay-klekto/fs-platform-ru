package com.fs.client.controller

import com.fs.client.repository.ProfessionRepository
import com.fs.domain.jooq.tables.pojos.CompanyProfession
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.ProfessionModel
import com.fs.service.ru.ProfessionWithInternshipTypeModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Profession")
@RestController
@RequestMapping("/profession", produces = ["application/json"])
class ProfessionController(
    private val professionRepository: ProfessionRepository
) {

    @QueryMapping
    suspend fun getProfessionById(@Argument id: Long): ProfessionModel? {
        return professionRepository.getProfessionById(id)
    }

    @QueryMapping
    suspend fun getNMostPopularProfessions(@Argument quantity: Int): List<ProfessionModel> {
        return professionRepository.getNMostPopularProfessions(quantity)
    }

    @QueryMapping
    suspend fun getAllProfessionsByCompanyId(@Argument id: Long): List<ProfessionModel> {
        return professionRepository.getAllProfessionsByCompanyId(id)
    }

    @QueryMapping
    suspend fun getAllProfessions(): List<ProfessionModel> {
        return professionRepository.getAllProfessions()
    }

    @QueryMapping
    suspend fun getAllExistingProfessions(): List<ProfessionWithInternshipTypeModel> {
        return professionRepository.getAllExistingProfessions()
    }

    @QueryMapping
    suspend fun getAllProfessionsByInternshipType(@Argument internshipTypeId: Long): List<ProfessionModel> {
        return professionRepository.getAllProfessionsByInternshipType(internshipTypeId)
    }

    @QueryMapping
    suspend fun getAllProfessionsCategories(): List<String> {
        return professionRepository.getAllProfessionsCategories()
    }

    @QueryMapping
    suspend fun getAllProfessionsCategoriesForTable(): List<String> {
        return professionRepository.getAllProfessionsCategoriesForTable()
    }

    @MutationMapping
    suspend fun addProfession(@Argument profession: ProfessionModel): ProfessionModel {
        return professionRepository.insertProfession(profession)
    }

    @MutationMapping
    suspend fun addCompanyProfession(
        @Argument companyProfession: CompanyProfession,
        @Argument profession: ProfessionModel
    ): ProfessionModel {
        return professionRepository.initCompanyProfession(companyProfession, profession)
    }

    @MutationMapping
    suspend fun addExistingProfessionToCompany(@Argument companyProfession: CompanyProfession): Boolean {
        return professionRepository.initExistingProfessionToCompany(companyProfession)
    }

    @MutationMapping
    suspend fun updateProfession(@Argument profession: ProfessionModel): Boolean {
        return professionRepository.updateProfession(profession)
    }

    @MutationMapping
    suspend fun deleteProfession(@Argument id: Long): Boolean {
        return professionRepository.deleteProfession(id)
    }

    @SchemaMapping(typeName = "CompanyProfession", field = "profession")
    suspend fun getProfessionForOrder(companyProfession: CompanyProfessionModel): ProfessionModel? {
        return professionRepository.getProfessionById(companyProfession.professionId!!)
    }
}
