package com.fs.auth.repository.impl

import com.fs.auth.repository.blocked.RefreshTokenBlockingRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultRefreshTokenBlockingRepository(
    dsl: DSLContext
): RefreshTokenBlockingRepository(dsl) {
}