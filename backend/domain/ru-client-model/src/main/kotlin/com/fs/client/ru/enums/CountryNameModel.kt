package com.fs.client.ru.enums

enum class CountryNameModel(val value: Long) {
    RUSSIA(643),
    BELARUS(112),
    POLAND(616),
    UNKNOWN(1);

    companion object {
        private val map = CountryNameModel.values()
            .associateBy(CountryNameModel::value)

        fun fromString(value: Long) = CountryNameModel.map[value]
    }
}