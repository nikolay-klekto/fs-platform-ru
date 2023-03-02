package com.fs.service.ru

import com.fs.service.ru.enums.CompanyLegalCapacityStatus
import com.fs.service.ru.enums.IndustryModel

data class CompanyModel(
    val id: Long,
    val companyIndustryModel: IndustryModel?,
    val legalCapacityStatus: CompanyLegalCapacityStatus?,
    val name: String?,
    val site: String?,
    val shortDescription: String?
)
