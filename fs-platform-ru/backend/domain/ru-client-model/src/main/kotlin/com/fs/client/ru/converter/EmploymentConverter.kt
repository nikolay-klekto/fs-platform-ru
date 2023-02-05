package com.fs.client.ru.converter

import com.fs.client.ru.enums.EmploymentModel
import org.jooq.impl.EnumConverter

class EmploymentConverter :
    EnumConverter<String, EmploymentModel>(String::class.java, EmploymentModel::class.java)
