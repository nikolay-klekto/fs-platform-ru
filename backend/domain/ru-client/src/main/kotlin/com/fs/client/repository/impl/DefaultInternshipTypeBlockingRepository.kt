package com.fs.client.repository.impl

import com.fs.client.repository.blocked.InternshipTypeBlockingRepository
import com.fs.client.converter.InternshipTypeModelConverter
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
open class DefaultInternshipTypeBlockingRepository(
    dsl: DSLContext,
    converter: InternshipTypeModelConverter
) : InternshipTypeBlockingRepository(dsl, converter)