package com.fs.client.ru.enums

enum class EmploymentModel(val value: Long) {

    SELF_EMPLOYED(1),
    SCHOOL_BOY(2),
    STUDENT(3),
    PENSIONER(4),
    UNEMPLOYED(5),
    EMPLOYER(6),
    EMPLOYEE(7),
    OTHER(8);

    companion object {
        private val map = EmploymentModel.values()
            .associateBy(EmploymentModel::value)

        fun fromString(value: Long) = EmploymentModel.map[value]
    }
}