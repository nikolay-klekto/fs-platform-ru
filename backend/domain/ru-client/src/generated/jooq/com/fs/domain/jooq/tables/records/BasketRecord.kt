/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables.records


import com.fs.domain.jooq.tables.Basket

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record2
import org.jooq.Row2
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class BasketRecord() : UpdatableRecordImpl<BasketRecord>(Basket.BASKET), Record2<Long?, Double?> {

    var id: Long?
        set(value): Unit = set(0, value)
        get(): Long? = get(0) as Long?

    var totalPrice: Double?
        set(value): Unit = set(1, value)
        get(): Double? = get(1) as Double?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Long?> = super.key() as Record1<Long?>

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row2<Long?, Double?> = super.fieldsRow() as Row2<Long?, Double?>
    override fun valuesRow(): Row2<Long?, Double?> = super.valuesRow() as Row2<Long?, Double?>
    override fun field1(): Field<Long?> = Basket.BASKET.ID
    override fun field2(): Field<Double?> = Basket.BASKET.TOTAL_PRICE
    override fun component1(): Long? = id
    override fun component2(): Double? = totalPrice
    override fun value1(): Long? = id
    override fun value2(): Double? = totalPrice

    override fun value1(value: Long?): BasketRecord {
        this.id = value
        return this
    }

    override fun value2(value: Double?): BasketRecord {
        this.totalPrice = value
        return this
    }

    override fun values(value1: Long?, value2: Double?): BasketRecord {
        this.value1(value1)
        this.value2(value2)
        return this
    }

    /**
     * Create a detached, initialised BasketRecord
     */
    constructor(id: Long? = null, totalPrice: Double? = null): this() {
        this.id = id
        this.totalPrice = totalPrice
    }

    /**
     * Create a detached, initialised BasketRecord
     */
    constructor(value: com.fs.domain.jooq.tables.pojos.Basket?): this() {
        if (value != null) {
            this.id = value.id
            this.totalPrice = value.totalPrice
        }
    }
}