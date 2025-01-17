package com.fs.client.controller

import com.fs.client.repository.ClientResetPasswordRepository
import com.fs.domain.jooq.tables.pojos.ClientsResetPasswords
import com.fs.service.ru.errors.ErrorModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
open class ClientResetPasswordController(open val clientResetPasswordRepository: ClientResetPasswordRepository) {

    @MutationMapping
    open fun resetClientPassword(@Argument email: String): Mono<ErrorModel<Boolean>> {
        return clientResetPasswordRepository.insertClientResetPassword(email)
    }

    @MutationMapping
    open fun checkResetCode(@Argument clientPasswordModel: ClientsResetPasswords): Mono<ErrorModel<String>> {
        return clientResetPasswordRepository.checkCode(clientPasswordModel)
    }
}