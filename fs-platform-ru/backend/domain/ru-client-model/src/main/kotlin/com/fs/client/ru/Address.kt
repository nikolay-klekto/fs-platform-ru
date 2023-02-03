package com.fs.client.ru

data class Address(
    val id: Long,
    val cityId: Long,
    val street: String,
    val house: Long,
    val building: Long,
    val apartment: Long
)
