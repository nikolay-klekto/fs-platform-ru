package com.fs.client.ru.enums

enum class EducationModel(val value: Long) {
    LOWER_SECONDARY(1),
    SECONDARY(2),
    INCOMPLETE_HIGHER(3),
    HIGHER(4),
    MAGISTRACY(5),
    OTHER(6);

    companion object {
        private val map = EducationModel.values()
            .associateBy(EducationModel::value)

        fun fromString(value: Long) = EducationModel.map[value]
    }
}