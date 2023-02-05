package com.fs.service.ru

import com.fs.service.ru.enums.Industry

data class Companies(
    val id: Long,
    val companyIndustry: Industry,
    val site: String,
    val name: String,
    val shortDescription: String
)
