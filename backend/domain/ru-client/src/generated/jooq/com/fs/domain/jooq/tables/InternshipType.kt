/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables


import com.fs.domain.jooq.Public
import com.fs.domain.jooq.keys.INTERNSHIP_TYPE_PKEY
import com.fs.domain.jooq.tables.records.InternshipTypeRecord

import java.util.function.Function

import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Identity
import org.jooq.Name
import org.jooq.Record
import org.jooq.Records
import org.jooq.Row3
import org.jooq.Schema
import org.jooq.SelectField
import org.jooq.Table
import org.jooq.TableField
import org.jooq.TableOptions
import org.jooq.UniqueKey
import org.jooq.impl.DSL
import org.jooq.impl.Internal
import org.jooq.impl.SQLDataType
import org.jooq.impl.TableImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class InternshipType(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, InternshipTypeRecord>?,
    aliased: Table<InternshipTypeRecord>?,
    parameters: Array<Field<*>?>?
): TableImpl<InternshipTypeRecord>(
    alias,
    Public.PUBLIC,
    child,
    path,
    aliased,
    parameters,
    DSL.comment(""),
    TableOptions.table()
) {
    companion object {

        /**
         * The reference instance of <code>public.internship_type</code>
         */
        val INTERNSHIP_TYPE: InternshipType = InternshipType()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<InternshipTypeRecord> = InternshipTypeRecord::class.java

    /**
     * The column <code>public.internship_type.id</code>.
     */
    val ID: TableField<InternshipTypeRecord, Long?> = createField(DSL.name("id"), SQLDataType.BIGINT.nullable(false).identity(true), this, "")

    /**
     * The column <code>public.internship_type.name</code>.
     */
    val NAME: TableField<InternshipTypeRecord, String?> = createField(DSL.name("name"), SQLDataType.VARCHAR, this, "")

    /**
     * The column <code>public.internship_type.description</code>.
     */
    val DESCRIPTION: TableField<InternshipTypeRecord, String?> = createField(DSL.name("description"), SQLDataType.VARCHAR, this, "")

    private constructor(alias: Name, aliased: Table<InternshipTypeRecord>?): this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<InternshipTypeRecord>?, parameters: Array<Field<*>?>?): this(alias, null, null, aliased, parameters)

    /**
     * Create an aliased <code>public.internship_type</code> table reference
     */
    constructor(alias: String): this(DSL.name(alias))

    /**
     * Create an aliased <code>public.internship_type</code> table reference
     */
    constructor(alias: Name): this(alias, null)

    /**
     * Create a <code>public.internship_type</code> table reference
     */
    constructor(): this(DSL.name("internship_type"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, InternshipTypeRecord>): this(Internal.createPathAlias(child, key), child, key, INTERNSHIP_TYPE, null)
    override fun getSchema(): Schema? = if (aliased()) null else Public.PUBLIC
    override fun getIdentity(): Identity<InternshipTypeRecord, Long?> = super.getIdentity() as Identity<InternshipTypeRecord, Long?>
    override fun getPrimaryKey(): UniqueKey<InternshipTypeRecord> = INTERNSHIP_TYPE_PKEY
    override fun `as`(alias: String): InternshipType = InternshipType(DSL.name(alias), this)
    override fun `as`(alias: Name): InternshipType = InternshipType(alias, this)
    override fun `as`(alias: Table<*>): InternshipType = InternshipType(alias.getQualifiedName(), this)

    /**
     * Rename this table
     */
    override fun rename(name: String): InternshipType = InternshipType(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): InternshipType = InternshipType(name, null)

    /**
     * Rename this table
     */
    override fun rename(name: Table<*>): InternshipType = InternshipType(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row3 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row3<Long?, String?, String?> = super.fieldsRow() as Row3<Long?, String?, String?>

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    fun <U> mapping(from: (Long?, String?, String?) -> U): SelectField<U> = convertFrom(Records.mapping(from))

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    fun <U> mapping(toType: Class<U>, from: (Long?, String?, String?) -> U): SelectField<U> = convertFrom(toType, Records.mapping(from))
}
