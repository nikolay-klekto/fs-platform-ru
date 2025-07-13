package com.fs.service.ru

data class ProfessionWithInternshipTypeModel(
    val id: Long?,
    val name: String?,
    val description: String?,
    val clientsNumber: Int?,
    val professionIndustry: String?,
    val pricePerWeek: Double?,
    val internshipTypeId: String?
)
