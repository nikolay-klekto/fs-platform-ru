/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables.pojos


import java.io.Serializable


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
data class Office(
    var id: Long? = null,
    var addressId: Long? = null,
    var companyId: Long? = null,
    var phoneNumber: String? = null
) : Serializable {


    override fun toString(): String {
        val sb = StringBuilder("Office (")

        sb.append(id)
        sb.append(", ").append(addressId)
        sb.append(", ").append(companyId)
        sb.append(", ").append(phoneNumber)

        sb.append(")")
        return sb.toString()
    }
}