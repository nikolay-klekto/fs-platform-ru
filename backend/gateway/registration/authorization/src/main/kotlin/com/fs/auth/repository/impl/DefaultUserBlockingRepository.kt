package com.fs.auth.repository.impl

import com.fs.auth.repository.blocked.UserBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultUserBlockingRepository(
    dsl: DSLContext
): UserBlockingRepository(dsl) {
}