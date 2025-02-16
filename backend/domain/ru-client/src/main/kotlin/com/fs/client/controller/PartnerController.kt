package com.fs.client.controller

import com.fs.client.repository.PartnerRepository
import com.fs.client.ru.PartnerModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Partner")
@RestController
@RequestMapping("/position", produces = ["application/json"])
class PartnerController(
    private val partnerRepository: PartnerRepository
) {

    @QueryMapping
    suspend fun getPartnerById(@Argument id: Long): PartnerModel? {
        return partnerRepository.getPartnerById(id)
    }

    @QueryMapping
    suspend fun getAllPartners(): List<PartnerModel> {
        return partnerRepository.getAllPartners()
    }

    @QueryMapping
    suspend fun getPartnersByCompanyId(@Argument id: Long): List<PartnerModel> {
        return partnerRepository.getPartnerByCompanyId(id)
    }

    @MutationMapping
    suspend fun deletePartner(@Argument id: Long): Boolean {
        return partnerRepository.deletePartner(id)
    }

    @MutationMapping
    suspend fun verifyPartner(@Argument partnerId: Long): Boolean {
        return partnerRepository.verifyPartnerStatus(partnerId)
    }
}
