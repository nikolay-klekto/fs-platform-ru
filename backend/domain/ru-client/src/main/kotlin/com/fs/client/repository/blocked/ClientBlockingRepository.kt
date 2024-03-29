package com.fs.client.repository.blocked

import com.fs.client.repository.OrderRepository
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.service.ClientModelConverter
import com.fs.client.service.PasswordService
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.pojos.Client
import com.fs.domain.jooq.tables.records.ClientRecord
import org.jooq.DSLContext
import java.time.LocalDateTime

abstract class ClientBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository,
    open val encoder: PasswordService,
    open val orderRepository: OrderRepository
) {

    fun getById(clientId: Long?): ClientModel? {
        return dsl.select(CLIENT.asterisk()).from(CLIENT)
            .where(CLIENT.ID.eq(clientId))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    private fun getByPhone(clientPhoneNumber: String): ClientModel? {
        return dsl.selectFrom(CLIENT).where(CLIENT.PHONE_NUMBER.eq(clientPhoneNumber))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    private fun getByEmail(clientEmail: String): ClientModel? {
        return dsl.selectFrom(CLIENT).where(CLIENT.EMAIL.eq(clientEmail))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun insert(clientModel: ClientModel): ClientModel {

        val passwordCredentials = if (clientModel.password != null) {
            encoder.encodePassword(clientModel.password!!)
        } else {
            null
        }

        if (clientModel.email != null) {
            val possibleUnregisteredClient = getByEmail(clientModel.email!!)
            if (possibleUnregisteredClient != null
                && possibleUnregisteredClient.role == ClientRoleModel.UNREGISTERED_CLIENT
            ) {

                val newClient = ClientModel(
                    id = possibleUnregisteredClient.id,
                    basketId = possibleUnregisteredClient.basketId,
                    cityId = clientModel.cityId ?: possibleUnregisteredClient.cityId,
                    activateStatus = clientModel.activateStatus ?: possibleUnregisteredClient.activateStatus,
                    birthday = clientModel.birthday,
                    dateCreated = possibleUnregisteredClient.dateCreated,
                    educationStatus = clientModel.educationStatus,
                    email = clientModel.email ?: possibleUnregisteredClient.email,
                    employment = clientModel.employment,
                    firstName = clientModel.firstName ?: possibleUnregisteredClient.firstName,
                    lastName = clientModel.lastName ?: possibleUnregisteredClient.lastName,
                    password = passwordCredentials?.first,
                    phoneNumber = clientModel.phoneNumber ?: possibleUnregisteredClient.phoneNumber,
                    salt = passwordCredentials?.second,
                    role = clientModel.role,
                    telegramUsername = clientModel.telegramUsername,
                    username = clientModel.username,
                )
                update(newClient)
                if (clientModel.basketId != null) {
                    orderRepository.copyAllOrdersToMainBasket(
                        clientModel.basketId!!,
                        possibleUnregisteredClient.basketId!!
                    )
                }
                return getById(possibleUnregisteredClient.id)!!
            } else if (possibleUnregisteredClient != null) {
                throw Exception("Пользователь с данным мобильным номером уже был создан!")
            }
        }

        if ((clientModel.email == null || clientModel.username == null ||
                    clientModel.password == null || clientModel.phoneNumber == null)
            && clientModel.role == ClientRoleModel.CLIENT
        ) {
            throw Exception("Пропущены обязательные поля! Заполните email, username, password.")
        }

        if ((clientModel.email == null && clientModel.phoneNumber == null)
            && clientModel.role == ClientRoleModel.UNREGISTERED_CLIENT
        ) {
            throw Exception("Пропущены обязательные поля! Заполните email, username, password.")
        }

        val newClientRecord: ClientRecord = dsl.newRecord(CLIENT)
        var newBasketId: Long? = clientModel.basketId
        if (clientModel.basketId == null) {
            newBasketId = basketBlockingRepository.insert().id
        }
        val newClientModel = ClientModel(
            DEFAULT_CLIENT_ID,
            newBasketId,
            clientModel.cityId,
            DEFAULT_ACTIVE_STATUS,
            clientModel.birthday,
            LocalDateTime.now(),
            clientModel.educationStatus,
            clientModel.email,
            clientModel.employment,
            clientModel.firstName,
            clientModel.lastName,
            passwordCredentials?.first,
            clientModel.phoneNumber,
            passwordCredentials?.second,
            clientModel.role ?: defaultClientRole,
            clientModel.telegramUsername,
            clientModel.username
        )

        newClientRecord.from(newClientModel)
        newClientRecord.reset(CLIENT.ID)
        newClientRecord.store()
        return converter.toModel(newClientRecord.into(Client::class.java))

    }

    fun update(newClientModel: ClientModel): Boolean {

        val oldClientModel: ClientModel = getById(newClientModel.id)!!

        return dsl.update(CLIENT)
            .set(CLIENT.CITY_ID, newClientModel.cityId ?: oldClientModel.cityId)
            .set(CLIENT.BASKET_ID, newClientModel.basketId ?: oldClientModel.basketId)
            .set(CLIENT.BIRTHDAY, newClientModel.birthday ?: oldClientModel.birthday)
            .set(CLIENT.EDUCATION_STATUS, newClientModel.educationStatus ?: oldClientModel.educationStatus)
            .set(CLIENT.EMAIL, newClientModel.email ?: oldClientModel.email)
            .set(CLIENT.EMPLOYMENT, newClientModel.employment ?: oldClientModel.employment)
            .set(CLIENT.FIRST_NAME, newClientModel.firstName ?: oldClientModel.firstName)
            .set(CLIENT.LAST_NAME, newClientModel.lastName ?: oldClientModel.lastName)
            .set(CLIENT.ROLE, newClientModel.role ?: oldClientModel.role)
            .set(CLIENT.PASSWORD, newClientModel.password ?: oldClientModel.password)
            .set(CLIENT.PHONE_NUMBER, newClientModel.phoneNumber ?: oldClientModel.phoneNumber)
            .set(CLIENT.TELEGRAM_USERNAME, newClientModel.telegramUsername ?: oldClientModel.telegramUsername)
            .set(CLIENT.USERNAME, newClientModel.username ?: oldClientModel.username)
            .where(CLIENT.ID.eq(newClientModel.id))
            .execute() == 1
    }


    companion object {

        private const val DEFAULT_CLIENT_ID: Long = 1
        private val defaultClientRole = ClientRoleModel.CLIENT
        private const val DEFAULT_ACTIVE_STATUS: Boolean = false
    }
}