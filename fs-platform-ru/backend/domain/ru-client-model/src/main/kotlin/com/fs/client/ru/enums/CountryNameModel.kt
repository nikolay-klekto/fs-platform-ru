package com.fs.client.ru.enums

enum class CountryNameModel(val value: Long) {
    BELARUS(1),
    RUSSIA(2),
    POLAND(3);

    companion object {
        private val map = CountryNameModel.values()
            .associateBy(CountryNameModel::value)

        fun fromString(value: Long) = CountryNameModel.map[value]
    }
}