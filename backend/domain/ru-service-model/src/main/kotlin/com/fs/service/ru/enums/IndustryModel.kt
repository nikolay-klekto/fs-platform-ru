package com.fs.service.ru.enums

enum class IndustryModel(val value: Long) {
    CAR_INDUSTRY(1),
    ADMINISTRATIVE_STAFF(2),
    SECURITY(3),
    TOP_MANAGEMENT(4),
    MINERAL_INDUSTRY(5),
    HOME_SERVICE_STAFF(6),
    PURCHASE(7),
    IT(8),
    ART_ENTERTAINMENT_MASSMEDIA(9),
    MARKETING_ADVERTISEMENT_PR(10),
    MEDICINE_PHARMACY(11),
    SCIENCE_EDUCATION(12),
    SALES(13),
    MANUFACTURE_SERVICE_SUPPORT(14),
    WORKING_STAFF(15),
    RETAILING(16),
    AGRICULTURE(17),
    SPORT(18),
    STRATEGY_INVESTMENT_CONSULT(19),
    INSURANCE(20),
    BUILDING_REALTY(21),
    TRANSPORT_LOGISTICS_TRANSPORT(22),
    TOURISM_HOTELS_RESTAURANT(23),
    PERSONAL_MANAGEMENT_COACHING(24),
    FINANCE_ACCOUNTING(25),
    LAW(26),
    OTHER(27);

    companion object {
        private val map = IndustryModel.values()
            .associateBy(IndustryModel::value)

        fun fromString(value: Long) = IndustryModel.map[value]
    }
}