package com.fs.client.ru.enums

enum class CurrencyModel(val value: String) {
    BYN("BYN"),
    EUR("EUR"),
    RUB("RUB"),
    PLN("PLN"),
    UNKNOWN("UNKNOWN");

    companion object {
        private val map = CurrencyModel.values()
            .associateBy(CurrencyModel::value)

        fun fromString(value: String) = CurrencyModel.map[value]
    }
}