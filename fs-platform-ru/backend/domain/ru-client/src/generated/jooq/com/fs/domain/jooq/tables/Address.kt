/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables


import com.fs.domain.jooq.Public
import com.fs.domain.jooq.keys.ADDRESS_PKEY
import com.fs.domain.jooq.keys.ADDRESS__ADDRESS_CITY_ID_FKEY
import com.fs.domain.jooq.tables.records.AddressRecord
import org.jooq.*
import org.jooq.impl.DSL
import org.jooq.impl.Internal
import org.jooq.impl.SQLDataType
import org.jooq.impl.TableImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class Address(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, AddressRecord>?,
    aliased: Table<AddressRecord>?,
    parameters: Array<Field<*>?>?
) : TableImpl<AddressRecord>(
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
         * The reference instance of <code>public.address</code>
         */
        val ADDRESS: Address = Address()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<AddressRecord> = AddressRecord::class.java

    /**
     * The column <code>public.address.id</code>.
     */
    val ID: TableField<AddressRecord, Long?> =
        createField(DSL.name("id"), SQLDataType.BIGINT.nullable(false).identity(true), this, "")

    /**
     * The column <code>public.address.city_id</code>.
     */
    val CITY_ID: TableField<AddressRecord, Long?> = createField(DSL.name("city_id"), SQLDataType.BIGINT, this, "")

    /**
     * The column <code>public.address.apartment</code>.
     */
    val APARTMENT: TableField<AddressRecord, Long?> = createField(DSL.name("apartment"), SQLDataType.BIGINT, this, "")

    /**
     * The column <code>public.address.building</code>.
     */
    val BUILDING: TableField<AddressRecord, Long?> = createField(DSL.name("building"), SQLDataType.BIGINT, this, "")

    /**
     * The column <code>public.address.house</code>.
     */
    val HOUSE: TableField<AddressRecord, Long?> = createField(DSL.name("house"), SQLDataType.BIGINT, this, "")

    /**
     * The column <code>public.address.street</code>.
     */
    val STREET: TableField<AddressRecord, String?> = createField(DSL.name("street"), SQLDataType.VARCHAR, this, "")

    private constructor(alias: Name, aliased: Table<AddressRecord>?) : this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<AddressRecord>?, parameters: Array<Field<*>?>?) : this(
        alias,
        null,
        null,
        aliased,
        parameters
    )

    /**
     * Create an aliased <code>public.address</code> table reference
     */
    constructor(alias: String) : this(DSL.name(alias))

    /**
     * Create an aliased <code>public.address</code> table reference
     */
    constructor(alias: Name) : this(alias, null)

    /**
     * Create a <code>public.address</code> table reference
     */
    constructor() : this(DSL.name("address"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, AddressRecord>) : this(
        Internal.createPathAlias(
            child,
            key
        ), child, key, ADDRESS, null
    )
    override fun getSchema(): Schema? = if (aliased()) null else Public.PUBLIC
    override fun getIdentity(): Identity<AddressRecord, Long?> = super.getIdentity() as Identity<AddressRecord, Long?>
    override fun getPrimaryKey(): UniqueKey<AddressRecord> = ADDRESS_PKEY
    override fun getReferences(): List<ForeignKey<AddressRecord, *>> = listOf(ADDRESS__ADDRESS_CITY_ID_FKEY)

    private lateinit var _cities: Cities

    /**
     * Get the implicit join path to the <code>public.cities</code> table.
     */
    fun cities(): Cities {
        if (!this::_cities.isInitialized)
            _cities = Cities(this, ADDRESS__ADDRESS_CITY_ID_FKEY)

        return _cities;
    }
    override fun `as`(alias: String): Address = Address(DSL.name(alias), this)
    override fun `as`(alias: Name): Address = Address(alias, this)

    /**
     * Rename this table
     */
    override fun rename(name: String): Address = Address(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): Address = Address(name, null)

    // -------------------------------------------------------------------------
    // Row6 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row6<Long?, Long?, Long?, Long?, Long?, String?> =
        super.fieldsRow() as Row6<Long?, Long?, Long?, Long?, Long?, String?>
}