package com.fs.client.ru

import com.fs.client.ru.enums.CountryNameModel
import com.fs.client.ru.enums.CurrencyModel

data class CountryModel(
    val code: Int,
    val currency: CurrencyModel,
    val name: CountryNameModel
)
