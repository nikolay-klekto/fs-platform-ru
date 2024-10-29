package com.fs.service.ru.enums

enum class IndustryModel(val value: Long) {
    EconomyAndBusiness(1),
    ScienceAndTechnology(2),
    EducationAndCulture(3),
    PublicAdministrationAndLaw(4),
    HealthcareAndMedicine(5),
    EcologyAndAgriculture(6),
    OTHER(7);

    companion object {
        private val map = IndustryModel.values()
            .associateBy(IndustryModel::value)

        fun fromString(value: Long) = IndustryModel.map[value]
    }
}