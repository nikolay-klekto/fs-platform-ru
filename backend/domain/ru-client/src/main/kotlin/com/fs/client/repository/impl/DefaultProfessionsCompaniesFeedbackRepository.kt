package com.fs.client.repository.impl

import com.fs.client.repository.JobRequestsRepository
import com.fs.client.repository.ProfessionsCompaniesFeedbackRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class DefaultProfessionsCompaniesFeedbackRepository(
    dsl: DSLContext
) : ProfessionsCompaniesFeedbackRepository(dsl)