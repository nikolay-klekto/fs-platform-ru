/*
 * This file is generated by jOOQ.
 */
package com.fs.auth.jooq.tables.records


import com.fs.auth.jooq.tables.Order

import java.time.LocalDateTime

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record10
import org.jooq.Row10
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class OrderRecord() : UpdatableRecordImpl<OrderRecord>(Order.ORDER), Record10<Long?, Long?, Long?, Boolean?, LocalDateTime?, Long?, Double?, String?, LocalDateTime?, Long?> {

    open var id: Long?
        set(value): Unit = set(0, value)
        get(): Long? = get(0) as Long?

    open var basketId: Long?
        set(value): Unit = set(1, value)
        get(): Long? = get(1) as Long?

    open var companyOfficeId: Long?
        set(value): Unit = set(2, value)
        get(): Long? = get(2) as Long?

    @Suppress("INAPPLICABLE_JVM_NAME")
    @set:JvmName("setIsExpired")
    open var isExpired: Boolean?
        set(value): Unit = set(3, value)
        get(): Boolean? = get(3) as Boolean?

    open var startWorkDate: LocalDateTime?
        set(value): Unit = set(4, value)
        get(): LocalDateTime? = get(4) as LocalDateTime?

    open var totalWorkDays: Long?
        set(value): Unit = set(5, value)
        get(): Long? = get(5) as Long?

    open var price: Double?
        set(value): Unit = set(6, value)
        get(): Double? = get(6) as Double?

    open var orderStatus: String?
        set(value): Unit = set(7, value)
        get(): String? = get(7) as String?

    open var dateCreated: LocalDateTime?
        set(value): Unit = set(8, value)
        get(): LocalDateTime? = get(8) as LocalDateTime?

    open var companyProfessionId: Long?
        set(value): Unit = set(9, value)
        get(): Long? = get(9) as Long?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Long?> = super.key() as Record1<Long?>

    // -------------------------------------------------------------------------
    // Record10 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row10<Long?, Long?, Long?, Boolean?, LocalDateTime?, Long?, Double?, String?, LocalDateTime?, Long?> = super.fieldsRow() as Row10<Long?, Long?, Long?, Boolean?, LocalDateTime?, Long?, Double?, String?, LocalDateTime?, Long?>
    override fun valuesRow(): Row10<Long?, Long?, Long?, Boolean?, LocalDateTime?, Long?, Double?, String?, LocalDateTime?, Long?> = super.valuesRow() as Row10<Long?, Long?, Long?, Boolean?, LocalDateTime?, Long?, Double?, String?, LocalDateTime?, Long?>
    override fun field1(): Field<Long?> = Order.ORDER.ID
    override fun field2(): Field<Long?> = Order.ORDER.BASKET_ID
    override fun field3(): Field<Long?> = Order.ORDER.COMPANY_OFFICE_ID
    override fun field4(): Field<Boolean?> = Order.ORDER.IS_EXPIRED
    override fun field5(): Field<LocalDateTime?> = Order.ORDER.START_WORK_DATE
    override fun field6(): Field<Long?> = Order.ORDER.TOTAL_WORK_DAYS
    override fun field7(): Field<Double?> = Order.ORDER.PRICE
    override fun field8(): Field<String?> = Order.ORDER.ORDER_STATUS
    override fun field9(): Field<LocalDateTime?> = Order.ORDER.DATE_CREATED
    override fun field10(): Field<Long?> = Order.ORDER.COMPANY_PROFESSION_ID
    override fun component1(): Long? = id
    override fun component2(): Long? = basketId
    override fun component3(): Long? = companyOfficeId
    override fun component4(): Boolean? = isExpired
    override fun component5(): LocalDateTime? = startWorkDate
    override fun component6(): Long? = totalWorkDays
    override fun component7(): Double? = price
    override fun component8(): String? = orderStatus
    override fun component9(): LocalDateTime? = dateCreated
    override fun component10(): Long? = companyProfessionId
    override fun value1(): Long? = id
    override fun value2(): Long? = basketId
    override fun value3(): Long? = companyOfficeId
    override fun value4(): Boolean? = isExpired
    override fun value5(): LocalDateTime? = startWorkDate
    override fun value6(): Long? = totalWorkDays
    override fun value7(): Double? = price
    override fun value8(): String? = orderStatus
    override fun value9(): LocalDateTime? = dateCreated
    override fun value10(): Long? = companyProfessionId

    override fun value1(value: Long?): OrderRecord {
        this.id = value
        return this
    }

    override fun value2(value: Long?): OrderRecord {
        this.basketId = value
        return this
    }

    override fun value3(value: Long?): OrderRecord {
        this.companyOfficeId = value
        return this
    }

    override fun value4(value: Boolean?): OrderRecord {
        this.isExpired = value
        return this
    }

    override fun value5(value: LocalDateTime?): OrderRecord {
        this.startWorkDate = value
        return this
    }

    override fun value6(value: Long?): OrderRecord {
        this.totalWorkDays = value
        return this
    }

    override fun value7(value: Double?): OrderRecord {
        this.price = value
        return this
    }

    override fun value8(value: String?): OrderRecord {
        this.orderStatus = value
        return this
    }

    override fun value9(value: LocalDateTime?): OrderRecord {
        this.dateCreated = value
        return this
    }

    override fun value10(value: Long?): OrderRecord {
        this.companyProfessionId = value
        return this
    }

    override fun values(value1: Long?, value2: Long?, value3: Long?, value4: Boolean?, value5: LocalDateTime?, value6: Long?, value7: Double?, value8: String?, value9: LocalDateTime?, value10: Long?): OrderRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        this.value6(value6)
        this.value7(value7)
        this.value8(value8)
        this.value9(value9)
        this.value10(value10)
        return this
    }

    /**
     * Create a detached, initialised OrderRecord
     */
    constructor(id: Long? = null, basketId: Long? = null, companyOfficeId: Long? = null, isExpired: Boolean? = null, startWorkDate: LocalDateTime? = null, totalWorkDays: Long? = null, price: Double? = null, orderStatus: String? = null, dateCreated: LocalDateTime? = null, companyProfessionId: Long? = null): this() {
        this.id = id
        this.basketId = basketId
        this.companyOfficeId = companyOfficeId
        this.isExpired = isExpired
        this.startWorkDate = startWorkDate
        this.totalWorkDays = totalWorkDays
        this.price = price
        this.orderStatus = orderStatus
        this.dateCreated = dateCreated
        this.companyProfessionId = companyProfessionId
    }

    /**
     * Create a detached, initialised OrderRecord
     */
    constructor(value: com.fs.auth.jooq.tables.pojos.Order?): this() {
        if (value != null) {
            this.id = value.id
            this.basketId = value.basketId
            this.companyOfficeId = value.companyOfficeId
            this.isExpired = value.isExpired
            this.startWorkDate = value.startWorkDate
            this.totalWorkDays = value.totalWorkDays
            this.price = value.price
            this.orderStatus = value.orderStatus
            this.dateCreated = value.dateCreated
            this.companyProfessionId = value.companyProfessionId
        }
    }
}