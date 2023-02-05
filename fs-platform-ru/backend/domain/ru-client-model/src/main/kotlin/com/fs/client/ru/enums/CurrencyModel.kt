package com.fs.client.ru.enums

enum class CurrencyModel(val value: Long) {
    BYN(1),
    USD(2),
    EUR(3),
    RUB(4),
    PLN(5);

    companion object {
        private val map = CurrencyModel.values()
            .associateBy(CurrencyModel::value)

        fun fromString(value: Long) = CurrencyModel.map[value]
    }
}