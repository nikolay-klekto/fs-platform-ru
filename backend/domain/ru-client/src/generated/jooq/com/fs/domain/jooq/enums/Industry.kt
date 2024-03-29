/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.enums


import com.fs.domain.jooq.Public

import org.jooq.Catalog
import org.jooq.EnumType
import org.jooq.Schema


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
enum class Industry(@get:JvmName("literal") public val literal: String) : EnumType {
    IT("IT"),
    BOOKKEEPING("BOOKKEEPING"),
    FEC("FEC"),
    SERVICE("SERVICE"),
    ARMY("ARMY"),
    SECURITY("SECURITY"),
    RAWMATERIALSMINING("RAWMATERIALSMINING"),
    ART("ART"),
    MEDECINE("MEDECINE"),
    SCIENCE("SCIENCE"),
    GOV_SERVICE("GOV_SERVICE"),
    SALES("SALES"),
    PRODUCTION("PRODUCTION"),
    BUILDING("BUILDING"),
    TRANSPORT("TRANSPORT"),
    OTHER("OTHER");
    override fun getCatalog(): Catalog? = schema.catalog
    override fun getSchema(): Schema = Public.PUBLIC
    override fun getName(): String = "industry"
    override fun getLiteral(): String = literal
}
