package com.fs.client.ru

import com.fs.client.ru.enums.CountryCode
import com.fs.client.ru.enums.Currency

data class Country(
    val code: Long,
    val name: CountryCode,
    val currency: Currency
)
