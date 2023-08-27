package com.fs.client.ru.converter

import com.fs.client.ru.enums.EducationModel
import org.jooq.impl.EnumConverter

class EducationConverter :
    EnumConverter<String, EducationModel>(String::class.java, EducationModel::class.java)
