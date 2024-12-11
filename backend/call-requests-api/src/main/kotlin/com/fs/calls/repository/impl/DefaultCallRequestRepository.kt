package com.fs.calls.repository.impl

import com.fs.calls.jooq.tables.pojos.CallRequests
import com.fs.calls.repository.CallRequestRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultCallRequestRepository(
    dsl: DSLContext
): CallRequestRepository(dsl)