package com.fs.client.ru.enums

enum class Education(val value: Long) {
    LOWER_SECONDARY(1),
    SECONDARY(2),
    INCOMPLETE_HIGHER(3),
    HIGHER(4),
    MAGISTRACY(5),
    OTHER(6);

    companion object {
        private val map = Education.values()
            .associateBy(Education::value)

        fun fromString(value: Long) = Education.map[value]
    }
}