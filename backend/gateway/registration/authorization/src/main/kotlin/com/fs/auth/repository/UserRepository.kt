package com.fs.auth.repository

import com.fs.auth.jooq.tables.Client.Companion.CLIENT
import com.fs.auth.jooq.tables.pojos.Client
import com.fs.auth.jooq.tables.records.ClientRecord
import com.fs.auth.repository.blocked.BasketBlockingRepository
import com.fs.auth.repository.blocked.UserBlockingRepository
import com.fs.auth.service.PasswordService
import com.fs.client.ru.AuthorizationClientModel
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.github.f4b6a3.ulid.UlidCreator
import org.jooq.DSLContext
import java.time.LocalDateTime

abstract class UserRepository(
    open val dsl: DSLContext,
    open val passwordService: PasswordService,
    open val userBlockingRepository: UserBlockingRepository,
    open val basketBlockingRepository: BasketBlockingRepository
) {

    fun verifyPassword(clientModel: AuthorizationClientModel): ClientModel {
        if (clientModel.email == null || clientModel.password == null) {
            throw Exception("Введены не все поля!")
        }

        val possibleClient = userBlockingRepository.getByEmail(clientModel.email!!)
            ?: throw Exception("Аккаунт не найден, проверьте вводимые данные")

        if (passwordService.verifyPassword(
                clientModel.password!!,
                Pair(possibleClient.password!!, possibleClient.salt!!)
            )
        ) {
            return possibleClient
        } else {
            throw Exception("Неверно введён пароль")
        }

    }


    fun insert(clientModel: AuthorizationClientModel): String {

        // Проверяем обязательные поля
        if (clientModel.email == null || clientModel.password == null || clientModel.phoneNumber == null) {
            throw IllegalArgumentException("Пропущены обязательные поля! Заполните email, username, password.")
        }

        val passwordCredentials = passwordService.encodePassword(clientModel.password!!)

        // Проверяем, существует ли пользователь с таким email
        val possibleUnregisteredClient = userBlockingRepository.getByEmail(clientModel.email!!)
        if (possibleUnregisteredClient != null) {
            throw IllegalStateException("Пользователь с таким email уже существует!")
        }

        // Если basketId отсутствует, создаем корзину
        if (clientModel.basketId == null) {
            clientModel.basketId = basketBlockingRepository.insert().id
        }

        // Создаем запись клиента
        val newClientRecord: ClientRecord = dsl.newRecord(CLIENT)

        val newClientModel = Client(
            basketId = clientModel.basketId,
            cityId = null,
            activateStatus = DEFAULT_ACTIVE_STATUS,
            birthday = null,
            dateCreated = LocalDateTime.now(),
            educationStatus = null,
            email = clientModel.email,
            employment = null,
            firstName = null,
            lastName = null,
            password = passwordCredentials.first,
            phoneNumber = clientModel.phoneNumber,
            role = defaultClientRole,
            telegramUsername = null,
            username = null,
            salt = passwordCredentials.second,
            id = UlidCreator.getUlid().toString()
        )

        // Сохраняем клиента в базе
        newClientRecord.from(newClientModel)
        newClientRecord.store()

        return newClientRecord.into(ClientModel::class.java).id!!
    }

    companion object {

        private val DEFAULT_CLIENT = ClientModel(
            id = null,
            basketId = null,
            cityId = null,
            activateStatus = false,
            birthday = null,
            dateCreated = null,
            educationStatus = null,
            email = null,
            employment = null,
            firstName = null,
            lastName = null,
            password = null,
            phoneNumber = null,
            salt = null,
            role = null,
            telegramUsername = null,

        )
        private val defaultClientRole = ClientRoleModel.CLIENT
        private const val DEFAULT_ACTIVE_STATUS: Boolean = false
    }
}