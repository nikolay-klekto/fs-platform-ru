package com.fs.client.controller

import com.fs.client.repository.PartnerRepository
import com.fs.client.ru.ClientModel
import com.fs.client.ru.PartnerModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Partner")
@RestController
@RequestMapping("/position", produces = ["application/json"])
open class PartnerController(
    open val partnerRepository: PartnerRepository
) {

    @QueryMapping
    open fun getPartnerById(@Argument id: Long): Mono<PartnerModel> {
        return partnerRepository.getById(id)
    }

    @QueryMapping
    open fun getAllPartners(): Flux<PartnerModel> {
        return partnerRepository.getAll()
    }

    @QueryMapping
    open fun getPartnersByCompanyId(@Argument id: Long): Flux<PartnerModel> {
        return partnerRepository.getByCompanyId(id)
    }

    @MutationMapping
    open fun addPartner(@Argument client: ClientModel): Mono<PartnerModel> {
        return partnerRepository.insert(client)
    }

    @MutationMapping
    open fun deletePartner(@Argument id: Long): Mono<Boolean> {
        return partnerRepository.delete(id)
    }
}
