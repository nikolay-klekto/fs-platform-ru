package com.fs.auth.repository.impl

import com.fs.auth.repository.UserRepository
import com.fs.auth.service.PasswordService
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultUserRepository(
    dsl: DSLContext,
    passwordService: PasswordService,
    userBlockingRepository: DefaultUserBlockingRepository,
    basketBlockingRepository: DefaultBasketBlockingRepository
): UserRepository(dsl, passwordService, userBlockingRepository, basketBlockingRepository) {
}