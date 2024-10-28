package com.fs.client.repository.impl

import com.fs.client.repository.InternshipTypeRepository
import com.fs.client.repository.blocked.InternshipTypeBlockingRepository
import com.fs.client.converter.InternshipTypeModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultInternshipTypeRepository(
    dsl: DSLContext,
    converter: InternshipTypeModelConverter,
    internshipTypeBlockingRepository: InternshipTypeBlockingRepository
) :
    InternshipTypeRepository(dsl, converter, internshipTypeBlockingRepository)