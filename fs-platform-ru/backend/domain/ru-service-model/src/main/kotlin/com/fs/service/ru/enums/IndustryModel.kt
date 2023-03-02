package com.fs.service.ru.enums

enum class IndustryModel(val value: Long) {
    IT(1),
    BOOKKEEPING(2),
    FEC(3),
    SERVICE(4),
    ARMY(5),
    SECURITY(6),
    RAWMATERIALSMINING(7),
    ART(8),
    MEDICINE(9),
    SCIENCE(10),
    GOV_SERVICE(11),
    SALES(12),
    PRODUCTION(13),
    BUILDING(14),
    TRANSPORT(15),
    OTHER(16);

    companion object {
        private val map = IndustryModel.values()
            .associateBy(IndustryModel::value)

        fun fromString(value: Long) = IndustryModel.map[value]
    }
}