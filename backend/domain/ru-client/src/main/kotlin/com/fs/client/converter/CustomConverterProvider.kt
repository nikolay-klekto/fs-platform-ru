//package com.fs.client.converter
//
//import com.fs.client.ru.enums.ClientRoleModel
//import com.fs.client.ru.enums.EducationModel
//import com.fs.client.ru.enums.EmploymentModel
//import org.jooq.Converter
//import org.jooq.ConverterProvider
//
//class CustomConverterProvider : ConverterProvider {
//    override fun <T : Any?, U : Any?> provide(databaseType: Class<T>, userType: Class<U>): Converter<T, U>? {
//        return when (userType) {
//            EducationModel::class.java -> EducationModelConverter() as Converter<T, U>
//            EmploymentModel::class.java -> EmploymentModelConverter() as Converter<T, U>
//            ClientRoleModel::class.java -> ClientRoleModelConverter() as Converter<T, U>
//            else -> null
//        }
//    }
//}