package com.fs.client.repository.impl

import com.fs.client.repository.JobRequestsRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultJobRequestsRepository(
    dsl: DSLContext
) : JobRequestsRepository(dsl)