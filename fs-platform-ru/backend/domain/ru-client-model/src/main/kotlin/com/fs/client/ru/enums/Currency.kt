package com.fs.client.ru.enums

enum class Currency(val value: Long) {
    BYN(1),
    USD(2),
    EUR(3),
    RUB(4),
    PLN(5);

    companion object {
        private val map = Currency.values()
            .associateBy(Currency::value)

        fun fromString(value: Long) = Currency.map[value]
    }
}