/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables.records


import com.fs.domain.jooq.tables.Company
import com.fs.service.ru.enums.CompanyLegalCapacityStatus

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record6
import org.jooq.Row6
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class CompanyRecord() : UpdatableRecordImpl<CompanyRecord>(Company.COMPANY), Record6<Long?, String?, CompanyLegalCapacityStatus?, String?, String?, String?> {

    var id: Long?
        set(value): Unit = set(0, value)
        get(): Long? = get(0) as Long?

    var companyIndustry: String?
        set(value): Unit = set(1, value)
        get(): String? = get(1) as String?

    var legalCapacityStatus: CompanyLegalCapacityStatus?
        set(value): Unit = set(2, value)
        get(): CompanyLegalCapacityStatus? = get(2) as CompanyLegalCapacityStatus?

    var name: String?
        set(value): Unit = set(3, value)
        get(): String? = get(3) as String?

    var site: String?
        set(value): Unit = set(4, value)
        get(): String? = get(4) as String?

    var shortDescription: String?
        set(value): Unit = set(5, value)
        get(): String? = get(5) as String?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Long?> = super.key() as Record1<Long?>

    // -------------------------------------------------------------------------
    // Record6 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row6<Long?, String?, CompanyLegalCapacityStatus?, String?, String?, String?> = super.fieldsRow() as Row6<Long?, String?, CompanyLegalCapacityStatus?, String?, String?, String?>
    override fun valuesRow(): Row6<Long?, String?, CompanyLegalCapacityStatus?, String?, String?, String?> = super.valuesRow() as Row6<Long?, String?, CompanyLegalCapacityStatus?, String?, String?, String?>
    override fun field1(): Field<Long?> = Company.COMPANY.ID
    override fun field2(): Field<String?> = Company.COMPANY.COMPANY_INDUSTRY
    override fun field3(): Field<CompanyLegalCapacityStatus?> = Company.COMPANY.LEGAL_CAPACITY_STATUS
    override fun field4(): Field<String?> = Company.COMPANY.NAME
    override fun field5(): Field<String?> = Company.COMPANY.SITE
    override fun field6(): Field<String?> = Company.COMPANY.SHORT_DESCRIPTION
    override fun component1(): Long? = id
    override fun component2(): String? = companyIndustry
    override fun component3(): CompanyLegalCapacityStatus? = legalCapacityStatus
    override fun component4(): String? = name
    override fun component5(): String? = site
    override fun component6(): String? = shortDescription
    override fun value1(): Long? = id
    override fun value2(): String? = companyIndustry
    override fun value3(): CompanyLegalCapacityStatus? = legalCapacityStatus
    override fun value4(): String? = name
    override fun value5(): String? = site
    override fun value6(): String? = shortDescription

    override fun value1(value: Long?): CompanyRecord {
        this.id = value
        return this
    }

    override fun value2(value: String?): CompanyRecord {
        this.companyIndustry = value
        return this
    }

    override fun value3(value: CompanyLegalCapacityStatus?): CompanyRecord {
        this.legalCapacityStatus = value
        return this
    }

    override fun value4(value: String?): CompanyRecord {
        this.name = value
        return this
    }

    override fun value5(value: String?): CompanyRecord {
        this.site = value
        return this
    }

    override fun value6(value: String?): CompanyRecord {
        this.shortDescription = value
        return this
    }

    override fun values(value1: Long?, value2: String?, value3: CompanyLegalCapacityStatus?, value4: String?, value5: String?, value6: String?): CompanyRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        this.value6(value6)
        return this
    }

    /**
     * Create a detached, initialised CompanyRecord
     */
    constructor(id: Long? = null, companyIndustry: String? = null, legalCapacityStatus: CompanyLegalCapacityStatus? = null, name: String? = null, site: String? = null, shortDescription: String? = null): this() {
        this.id = id
        this.companyIndustry = companyIndustry
        this.legalCapacityStatus = legalCapacityStatus
        this.name = name
        this.site = site
        this.shortDescription = shortDescription
    }

    /**
     * Create a detached, initialised CompanyRecord
     */
    constructor(value: com.fs.domain.jooq.tables.pojos.Company?): this() {
        if (value != null) {
            this.id = value.id
            this.companyIndustry = value.companyIndustry
            this.legalCapacityStatus = value.legalCapacityStatus
            this.name = value.name
            this.site = value.site
            this.shortDescription = value.shortDescription
        }
    }
}
