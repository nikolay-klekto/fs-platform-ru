/*
 * This file is generated by jOOQ.
 */
package com.fs.calls.jooq.tables.pojos


import java.io.Serializable
import java.time.LocalDateTime


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
data class CallRequests(
    var id: Long? = null,
    var name: String? = null,
    var phoneNum: String? = null,
    @Suppress("INAPPLICABLE_JVM_NAME")
    @set:JvmName("setIsActive")
    var isActive: Boolean? = null,
    var dateCreated: LocalDateTime? = null,
    var callTime: String? = null
): Serializable {


    override fun toString(): String {
        val sb = StringBuilder("CallRequests (")

        sb.append(id)
        sb.append(", ").append(name)
        sb.append(", ").append(phoneNum)
        sb.append(", ").append(isActive)
        sb.append(", ").append(dateCreated)
        sb.append(", ").append(callTime)

        sb.append(")")
        return sb.toString()
    }
}
