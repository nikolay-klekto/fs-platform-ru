/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables.records


import com.fs.domain.jooq.tables.Event

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
open class EventRecord() : UpdatableRecordImpl<EventRecord>(Event.EVENT), Record10<Long?, Long?, LocalDateTime?, String?, Boolean?, String?, String?, String?, String?, String?> {

    var id: Long?
        set(value): Unit = set(0, value)
        get(): Long? = get(0) as Long?

    var addressId: Long?
        set(value): Unit = set(1, value)
        get(): Long? = get(1) as Long?

    var date: LocalDateTime?
        set(value): Unit = set(2, value)
        get(): LocalDateTime? = get(2) as LocalDateTime?

    var description: String?
        set(value): Unit = set(3, value)
        get(): String? = get(3) as String?

    @set:JvmName("setIsExpired")
    var isExpired: Boolean?
        set(value): Unit = set(4, value)
        get(): Boolean? = get(4) as Boolean?

    var mainGoal: String?
        set(value): Unit = set(5, value)
        get(): String? = get(5) as String?

    var name: String?
        set(value): Unit = set(6, value)
        get(): String? = get(6) as String?

    var phoneNumber: String?
        set(value): Unit = set(7, value)
        get(): String? = get(7) as String?

    var publicPlaceName: String?
        set(value): Unit = set(8, value)
        get(): String? = get(8) as String?

    var site: String?
        set(value): Unit = set(9, value)
        get(): String? = get(9) as String?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Long?> = super.key() as Record1<Long?>

    // -------------------------------------------------------------------------
    // Record10 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row10<Long?, Long?, LocalDateTime?, String?, Boolean?, String?, String?, String?, String?, String?> = super.fieldsRow() as Row10<Long?, Long?, LocalDateTime?, String?, Boolean?, String?, String?, String?, String?, String?>
    override fun valuesRow(): Row10<Long?, Long?, LocalDateTime?, String?, Boolean?, String?, String?, String?, String?, String?> = super.valuesRow() as Row10<Long?, Long?, LocalDateTime?, String?, Boolean?, String?, String?, String?, String?, String?>
    override fun field1(): Field<Long?> = Event.EVENT.ID
    override fun field2(): Field<Long?> = Event.EVENT.ADDRESS_ID
    override fun field3(): Field<LocalDateTime?> = Event.EVENT.DATE
    override fun field4(): Field<String?> = Event.EVENT.DESCRIPTION
    override fun field5(): Field<Boolean?> = Event.EVENT.IS_EXPIRED
    override fun field6(): Field<String?> = Event.EVENT.MAIN_GOAL
    override fun field7(): Field<String?> = Event.EVENT.NAME
    override fun field8(): Field<String?> = Event.EVENT.PHONE_NUMBER
    override fun field9(): Field<String?> = Event.EVENT.PUBLIC_PLACE_NAME
    override fun field10(): Field<String?> = Event.EVENT.SITE
    override fun component1(): Long? = id
    override fun component2(): Long? = addressId
    override fun component3(): LocalDateTime? = date
    override fun component4(): String? = description
    override fun component5(): Boolean? = isExpired
    override fun component6(): String? = mainGoal
    override fun component7(): String? = name
    override fun component8(): String? = phoneNumber
    override fun component9(): String? = publicPlaceName
    override fun component10(): String? = site
    override fun value1(): Long? = id
    override fun value2(): Long? = addressId
    override fun value3(): LocalDateTime? = date
    override fun value4(): String? = description
    override fun value5(): Boolean? = isExpired
    override fun value6(): String? = mainGoal
    override fun value7(): String? = name
    override fun value8(): String? = phoneNumber
    override fun value9(): String? = publicPlaceName
    override fun value10(): String? = site

    override fun value1(value: Long?): EventRecord {
        this.id = value
        return this
    }

    override fun value2(value: Long?): EventRecord {
        this.addressId = value
        return this
    }

    override fun value3(value: LocalDateTime?): EventRecord {
        this.date = value
        return this
    }

    override fun value4(value: String?): EventRecord {
        this.description = value
        return this
    }

    override fun value5(value: Boolean?): EventRecord {
        this.isExpired = value
        return this
    }

    override fun value6(value: String?): EventRecord {
        this.mainGoal = value
        return this
    }

    override fun value7(value: String?): EventRecord {
        this.name = value
        return this
    }

    override fun value8(value: String?): EventRecord {
        this.phoneNumber = value
        return this
    }

    override fun value9(value: String?): EventRecord {
        this.publicPlaceName = value
        return this
    }

    override fun value10(value: String?): EventRecord {
        this.site = value
        return this
    }

    override fun values(value1: Long?, value2: Long?, value3: LocalDateTime?, value4: String?, value5: Boolean?, value6: String?, value7: String?, value8: String?, value9: String?, value10: String?): EventRecord {
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
     * Create a detached, initialised EventRecord
     */
    constructor(id: Long? = null, addressId: Long? = null, date: LocalDateTime? = null, description: String? = null, isExpired: Boolean? = null, mainGoal: String? = null, name: String? = null, phoneNumber: String? = null, publicPlaceName: String? = null, site: String? = null): this() {
        this.id = id
        this.addressId = addressId
        this.date = date
        this.description = description
        this.isExpired = isExpired
        this.mainGoal = mainGoal
        this.name = name
        this.phoneNumber = phoneNumber
        this.publicPlaceName = publicPlaceName
        this.site = site
    }

    /**
     * Create a detached, initialised EventRecord
     */
    constructor(value: com.fs.domain.jooq.tables.pojos.Event?): this() {
        if (value != null) {
            this.id = value.id
            this.addressId = value.addressId
            this.date = value.date
            this.description = value.description
            this.isExpired = value.isExpired
            this.mainGoal = value.mainGoal
            this.name = value.name
            this.phoneNumber = value.phoneNumber
            this.publicPlaceName = value.publicPlaceName
            this.site = value.site
        }
    }
}
