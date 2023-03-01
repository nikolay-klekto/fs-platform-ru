package com.fs.client.ru

data class AddressModel(
    val id: Long,
    val cityId: Long?,
    val apartment: Long?,
    val building: Long?,
    val house: Long?,
    val street: String?
)
