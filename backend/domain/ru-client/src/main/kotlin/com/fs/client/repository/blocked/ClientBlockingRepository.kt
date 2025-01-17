package com.fs.client.repository.blocked

import com.fs.client.converter.ClientModelConverter
import com.fs.client.ru.ClientInputModel
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.pojos.Client
import org.jooq.DSLContext

abstract class ClientBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val cityBlockingRepository: CityBlockingRepository
) {

    fun getById(clientId: String?): ClientModel? {
        return dsl.select(CLIENT.asterisk()).from(CLIENT)
            .where(CLIENT.ID.eq(clientId))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun isEmailExist(email: String): Boolean{
        return dsl.selectCount().from(CLIENT)
            .where(CLIENT.EMAIL.eq(email))
            .first()
            .map { it.into(Int::class.java) } > 0
    }

    private fun getByPhone(clientPhoneNumber: String): ClientModel? {
        return dsl.selectFrom(CLIENT).where(CLIENT.PHONE_NUMBER.eq(clientPhoneNumber))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun getByEmail(clientEmail: String): ClientModel? {
        return dsl.selectFrom(CLIENT).where(CLIENT.EMAIL.eq(clientEmail))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun getIdByEmail(clientEmail: String): String? {
        return dsl.select(CLIENT.ID).from(CLIENT).where(CLIENT.EMAIL.eq(clientEmail))
            .map { it.into(String::class.java) }
            .firstOrNull()
    }

//    fun insert(clientModel: ClientInputModel): ClientModel {
//
//        val passwordCredentials = if (clientModel.password != null) {
//            encoder.encodePassword(clientModel.password!!)
//        } else {
//            null
//        }
//
//        if (clientModel.email != null) {
//            val possibleUnregisteredClient = getByEmail(clientModel.email!!)
//            if (possibleUnregisteredClient != null
//                && possibleUnregisteredClient.role == ClientRoleModel.UNREGISTERED_CLIENT
//            ) {
//
//                val newClient = ClientModel(
//                    id = possibleUnregisteredClient.id,
//                    basketId = possibleUnregisteredClient.basketId,
//                    cityId = clientModel.cityId ?: possibleUnregisteredClient.cityId,
//                    activateStatus = possibleUnregisteredClient.activateStatus,
//                    birthday = clientModel.birthday,
//                    dateCreated = possibleUnregisteredClient.dateCreated,
//                    educationStatus = clientModel.educationStatus,
//                    email = clientModel.email ?: possibleUnregisteredClient.email,
//                    employment = clientModel.employment,
//                    firstName = clientModel.firstName ?: possibleUnregisteredClient.firstName,
//                    lastName = clientModel.lastName ?: possibleUnregisteredClient.lastName,
//                    password = passwordCredentials?.first,
//                    phoneNumber = clientModel.phoneNumber ?: possibleUnregisteredClient.phoneNumber,
//                    salt = passwordCredentials?.second,
//                    role = possibleUnregisteredClient.role,
//                    telegramUsername = clientModel.telegramUsername
//                )
//                update(newClient)
//                if (clientModel.basketId != null) {
//                    orderRepository.copyAllOrdersToMainBasket(
//                        clientModel.basketId!!,
//                        possibleUnregisteredClient.basketId!!
//                    )
//                }
//                return getById(possibleUnregisteredClient.id)!!
//            } else if (possibleUnregisteredClient != null) {
//                throw Exception("Пользователь с данным мобильным номером уже был создан!")
//            }
//        }
//
//        if ((clientModel.email == null || clientModel.password == null || clientModel.phoneNumber == null)
//            && clientModel.role == ClientRoleModel.CLIENT
//        ) {
//            throw Exception("Пропущены обязательные поля! Заполните email, username, password.")
//        }
//
//        if ((clientModel.email == null && clientModel.phoneNumber == null)
//            && clientModel.role == ClientRoleModel.UNREGISTERED_CLIENT
//        ) {
//            throw Exception("Пропущены обязательные поля! Заполните email, username, password.")
//        }
//
//        val newClientRecord: ClientRecord = dsl.newRecord(CLIENT)
//        var newBasketId: Long? = clientModel.basketId
//        if (clientModel.basketId == null) {
//            newBasketId = basketBlockingRepository.insert().id
//        }
//        val newClientModel = ClientModel(
//            DEFAULT_CLIENT_ID,
//            newBasketId,
//            clientModel.cityId,
//            DEFAULT_ACTIVE_STATUS,
//            clientModel.birthday,
//            LocalDateTime.now(),
//            clientModel.educationStatus,
//            clientModel.email,
//            clientModel.employment,
//            clientModel.firstName,
//            clientModel.lastName,
//            passwordCredentials?.first,
//            clientModel.phoneNumber,
//            passwordCredentials?.second,
//            clientModel.role ?: defaultClientRole,
//            clientModel.telegramUsername
//        )
//
//        newClientRecord.from(newClientModel)
//        newClientRecord.reset(CLIENT.ID)
//        newClientRecord.store()
//        return converter.toModel(newClientRecord.into(Client::class.java))
//
//    }

    fun update(newClientModel: ClientInputModel): Boolean {

        val oldClientModel: ClientModel = getById(newClientModel.id)!!

        var cityId = oldClientModel.cityId

        if(newClientModel.city != null) {
            cityId =
                cityBlockingRepository.getCityIdByName(newClientModel.city) ?: cityBlockingRepository.insertCityByName(
                    newClientModel.city!!
                ).id
        }

        return dsl.update(CLIENT)
            .set(CLIENT.CITY_ID, cityId ?: oldClientModel.cityId)
            .set(CLIENT.BIRTHDAY, newClientModel.birthday ?: oldClientModel.birthday)
            .set(CLIENT.EDUCATION_STATUS, newClientModel.educationStatus ?: oldClientModel.educationStatus)
            .set(CLIENT.EMAIL, newClientModel.email ?: oldClientModel.email)
            .set(CLIENT.EMPLOYMENT, newClientModel.employment ?: oldClientModel.employment)
            .set(CLIENT.FIRST_NAME, newClientModel.firstName ?: oldClientModel.firstName)
            .set(CLIENT.LAST_NAME, newClientModel.lastName ?: oldClientModel.lastName)
            .set(CLIENT.PHONE_NUMBER, newClientModel.phoneNumber ?: oldClientModel.phoneNumber)
            .set(CLIENT.TELEGRAM_USERNAME, newClientModel.telegramUsername ?: oldClientModel.telegramUsername)
            .where(CLIENT.ID.eq(newClientModel.id))
            .execute() == 1
    }


    companion object {

        private const val DEFAULT_CLIENT_ID: String = "1"
        private val defaultClientRole = ClientRoleModel.CLIENT
        private const val DEFAULT_ACTIVE_STATUS: Boolean = false
    }
}