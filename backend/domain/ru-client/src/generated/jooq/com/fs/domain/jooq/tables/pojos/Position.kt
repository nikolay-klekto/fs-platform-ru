/*
 * This file is generated by jOOQ.
 */
package com.fs.domain.jooq.tables.pojos


import java.io.Serializable


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
data class Position(
    var id: Long? = null,
    var description: String? = null,
    var name: String? = null
): Serializable {


    override fun toString(): String {
        val sb = StringBuilder("Position (")

        sb.append(id)
        sb.append(", ").append(description)
        sb.append(", ").append(name)

        sb.append(")")
        return sb.toString()
    }
}