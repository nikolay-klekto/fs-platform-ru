package com.fs.client.controller

import com.fs.client.repository.ClientResetPasswordRepository
import com.fs.domain.jooq.tables.pojos.ClientsResetPasswords
import com.fs.service.ru.errors.ErrorModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RestController

@RestController
open class ClientResetPasswordController(private val clientResetPasswordRepository: ClientResetPasswordRepository) {

    @MutationMapping
    suspend fun resetClientPassword(@Argument email: String): ErrorModel<Boolean> {
        return clientResetPasswordRepository.insertClientResetPassword(email)
    }

    @MutationMapping
    suspend fun checkResetCode(@Argument clientPasswordModel: ClientsResetPasswords): ErrorModel<String> {
        return clientResetPasswordRepository.checkCode(clientPasswordModel)
    }
}
