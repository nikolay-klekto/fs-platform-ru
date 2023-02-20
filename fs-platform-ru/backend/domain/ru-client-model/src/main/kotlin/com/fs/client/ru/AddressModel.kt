package com.fs.client.ru

data class AddressModel(
    val id: Int,
    val cityId: Int?,
    val apartment: Int?,
    val building: Int?,
    val house: Int?,
    val street: String?
)
