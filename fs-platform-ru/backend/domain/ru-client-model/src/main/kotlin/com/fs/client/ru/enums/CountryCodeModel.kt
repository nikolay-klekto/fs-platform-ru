package com.fs.client.ru.enums

enum class CountryCodeModel(val value: Long) {
    BELARUS(1),
    RUSSIA(2),
    POLAND(3);

    companion object {
        private val map = CountryCodeModel.values()
            .associateBy(CountryCodeModel::value)

        fun fromString(value: Long) = CountryCodeModel.map[value]
    }
}