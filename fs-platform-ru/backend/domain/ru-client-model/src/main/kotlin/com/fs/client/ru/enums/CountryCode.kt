package com.fs.client.ru.enums

enum class CountryCode(val value: Long) {
    BELARUS(1),
    RUSSIA(2),
    POLAND(3);

    companion object {
        private val map = CountryCode.values()
            .associateBy(CountryCode::value)

        fun fromString(value: Long) = CountryCode.map[value]
    }
}