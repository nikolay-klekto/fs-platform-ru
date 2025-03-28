/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables


import com.fs.domain.jooq.Public
import com.fs.domain.jooq.keys.OFFICE_PKEY
import com.fs.domain.jooq.keys.OFFICE__OFFICE_ADDRESS_ID_FKEY
import com.fs.domain.jooq.keys.OFFICE__OFFICE_COMPANY_ID_FKEY
import com.fs.domain.jooq.tables.records.OfficeRecord

import java.util.function.Function

import kotlin.collections.List

import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Identity
import org.jooq.Name
import org.jooq.Record
import org.jooq.Records
import org.jooq.Row4
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
open class Office(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, OfficeRecord>?,
    aliased: Table<OfficeRecord>?,
    parameters: Array<Field<*>?>?
): TableImpl<OfficeRecord>(
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
         * The reference instance of <code>public.office</code>
         */
        val OFFICE: Office = Office()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<OfficeRecord> = OfficeRecord::class.java

    /**
     * The column <code>public.office.id</code>.
     */
    val ID: TableField<OfficeRecord, Long?> = createField(DSL.name("id"), SQLDataType.BIGINT.nullable(false).identity(true), this, "")

    /**
     * The column <code>public.office.address_id</code>.
     */
    val ADDRESS_ID: TableField<OfficeRecord, Long?> = createField(DSL.name("address_id"), SQLDataType.BIGINT, this, "")

    /**
     * The column <code>public.office.company_id</code>.
     */
    val COMPANY_ID: TableField<OfficeRecord, Long?> = createField(DSL.name("company_id"), SQLDataType.BIGINT, this, "")

    /**
     * The column <code>public.office.phone_number</code>.
     */
    val PHONE_NUMBER: TableField<OfficeRecord, String?> = createField(DSL.name("phone_number"), SQLDataType.VARCHAR, this, "")

    private constructor(alias: Name, aliased: Table<OfficeRecord>?): this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<OfficeRecord>?, parameters: Array<Field<*>?>?): this(alias, null, null, aliased, parameters)

    /**
     * Create an aliased <code>public.office</code> table reference
     */
    constructor(alias: String): this(DSL.name(alias))

    /**
     * Create an aliased <code>public.office</code> table reference
     */
    constructor(alias: Name): this(alias, null)

    /**
     * Create a <code>public.office</code> table reference
     */
    constructor(): this(DSL.name("office"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, OfficeRecord>): this(Internal.createPathAlias(child, key), child, key, OFFICE, null)
    override fun getSchema(): Schema? = if (aliased()) null else Public.PUBLIC
    override fun getIdentity(): Identity<OfficeRecord, Long?> = super.getIdentity() as Identity<OfficeRecord, Long?>
    override fun getPrimaryKey(): UniqueKey<OfficeRecord> = OFFICE_PKEY
    override fun getReferences(): List<ForeignKey<OfficeRecord, *>> = listOf(OFFICE__OFFICE_ADDRESS_ID_FKEY, OFFICE__OFFICE_COMPANY_ID_FKEY)

    private lateinit var _address: Address
    private lateinit var _company: Company

    /**
     * Get the implicit join path to the <code>public.address</code> table.
     */
    fun address(): Address {
        if (!this::_address.isInitialized)
            _address = Address(this, OFFICE__OFFICE_ADDRESS_ID_FKEY)

        return _address;
    }

    val address: Address
        get(): Address = address()

    /**
     * Get the implicit join path to the <code>public.company</code> table.
     */
    fun company(): Company {
        if (!this::_company.isInitialized)
            _company = Company(this, OFFICE__OFFICE_COMPANY_ID_FKEY)

        return _company;
    }

    val company: Company
        get(): Company = company()
    override fun `as`(alias: String): Office = Office(DSL.name(alias), this)
    override fun `as`(alias: Name): Office = Office(alias, this)
    override fun `as`(alias: Table<*>): Office = Office(alias.getQualifiedName(), this)

    /**
     * Rename this table
     */
    override fun rename(name: String): Office = Office(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): Office = Office(name, null)

    /**
     * Rename this table
     */
    override fun rename(name: Table<*>): Office = Office(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row4 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row4<Long?, Long?, Long?, String?> = super.fieldsRow() as Row4<Long?, Long?, Long?, String?>

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    fun <U> mapping(from: (Long?, Long?, Long?, String?) -> U): SelectField<U> = convertFrom(Records.mapping(from))

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    fun <U> mapping(toType: Class<U>, from: (Long?, Long?, Long?, String?) -> U): SelectField<U> = convertFrom(toType, Records.mapping(from))
}
