package com.fs.client.controller

import com.fs.client.repository.ProfessionRepository
import com.fs.service.ru.CompanyProfessionModel
import com.fs.service.ru.ProfessionModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Position")
@RestController
@RequestMapping("/position", produces = ["application/json"])
open class ProfessionController(
    open val professionRepository: ProfessionRepository
) {

    @QueryMapping
    open fun getProfessionById(@Argument id: Long): Mono<ProfessionModel> {
        return professionRepository.getProfessionById(id)
    }

    @QueryMapping
    open fun getNMostPopularProfessions(@Argument quantity: Int): Flux<ProfessionModel> {
        return professionRepository.getNMostPopularProfessions(quantity)
    }

    @QueryMapping
    open fun getAllProfessionsByCompanyId(@Argument id: Long): Flux<ProfessionModel> {
        return professionRepository.getAllProfessionsByCompanyId(id)
    }

    @QueryMapping
    open fun getAllProfessions(): Flux<ProfessionModel> {
        return professionRepository.getAllProfessions()
    }

    @MutationMapping
    open fun addProfession(@Argument profession: ProfessionModel): Mono<ProfessionModel> {
        return professionRepository.insertProfession(profession)
    }

    @MutationMapping
    open fun addCompanyProfession(
        @Argument companyId: Long,
        @Argument profession: ProfessionModel
    ): Mono<ProfessionModel> {
        return professionRepository.initCompanyProfession(companyId, profession)
    }

    @MutationMapping
    open fun addExistingProfessionToCompany(
        @Argument companyId: Long,
        @Argument professionId: Long
    ): Mono<Boolean> {
        return professionRepository.initExistingProfessionToCompany(companyId, professionId)
    }

    @MutationMapping
    open fun updateProfession(@Argument profession: ProfessionModel): Mono<Boolean> {
        return professionRepository.updateProfession(profession)
    }

    @MutationMapping
    open fun deleteProfession(@Argument id: Long): Mono<Boolean> {
        return professionRepository.deleteProfession(id)
    }

    @SchemaMapping(typeName = "CompanyProfession", field = "profession")
    fun getProfessionForOrder(companyProfession: CompanyProfessionModel): Mono<ProfessionModel> {
        return professionRepository.getProfessionById(companyProfession.professionId!!)
    }
}
