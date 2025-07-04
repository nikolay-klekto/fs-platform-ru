package com.fs.client.controller

import com.fs.client.repository.ConstantsRepository
import com.fs.domain.jooq.tables.pojos.Constants
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.web.bind.annotation.RestController

@RestController
open class ConstantsController(
    private val constantsRepository: ConstantsRepository
) {

    @QueryMapping
    suspend fun getDaysForPayOrder(): Int {
        return constantsRepository.getDaysForPayOrder()
    }

    @QueryMapping
    suspend fun getInfoForContactPage(): Constants {
        return constantsRepository.getInfoForContactPage()
    }

    @QueryMapping
    suspend fun getInfoForFooter(): Constants {
        return constantsRepository.getInfoForContactPage()
    }
}
