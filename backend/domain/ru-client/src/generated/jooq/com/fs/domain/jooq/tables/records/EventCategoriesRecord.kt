/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables.records


import com.fs.domain.jooq.tables.EventCategories

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record2
import org.jooq.Row2
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class EventCategoriesRecord() : UpdatableRecordImpl<EventCategoriesRecord>(EventCategories.EVENT_CATEGORIES), Record2<Long?, String?> {

    open var id: Long?
        set(value): Unit = set(0, value)
        get(): Long? = get(0) as Long?

    open var category: String?
        set(value): Unit = set(1, value)
        get(): String? = get(1) as String?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Long?> = super.key() as Record1<Long?>

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row2<Long?, String?> = super.fieldsRow() as Row2<Long?, String?>
    override fun valuesRow(): Row2<Long?, String?> = super.valuesRow() as Row2<Long?, String?>
    override fun field1(): Field<Long?> = EventCategories.EVENT_CATEGORIES.ID
    override fun field2(): Field<String?> = EventCategories.EVENT_CATEGORIES.CATEGORY
    override fun component1(): Long? = id
    override fun component2(): String? = category
    override fun value1(): Long? = id
    override fun value2(): String? = category

    override fun value1(value: Long?): EventCategoriesRecord {
        this.id = value
        return this
    }

    override fun value2(value: String?): EventCategoriesRecord {
        this.category = value
        return this
    }

    override fun values(value1: Long?, value2: String?): EventCategoriesRecord {
        this.value1(value1)
        this.value2(value2)
        return this
    }

    /**
     * Create a detached, initialised EventCategoriesRecord
     */
    constructor(id: Long? = null, category: String? = null): this() {
        this.id = id
        this.category = category
    }

    /**
     * Create a detached, initialised EventCategoriesRecord
     */
    constructor(value: com.fs.domain.jooq.tables.pojos.EventCategories?): this() {
        if (value != null) {
            this.id = value.id
            this.category = value.category
        }
    }
}
