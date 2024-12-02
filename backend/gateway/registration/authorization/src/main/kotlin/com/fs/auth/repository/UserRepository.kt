package com.fs.auth.repository

import com.fs.auth.repository.blocked.BasketBlockingRepository
import com.fs.auth.repository.blocked.UserBlockingRepository
import com.fs.auth.service.PasswordService
import com.fs.client.ru.AuthorizationClientModel
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.domain.jooq.tables.Client
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.records.ClientRecord
import com.github.f4b6a3.ulid.UlidCreator
import org.jooq.DSLContext
import reactor.core.publisher.Mono
import java.time.LocalDateTime

abstract class UserRepository(
    open val dsl: DSLContext,
    open val passwordService: PasswordService,
    open val userBlockingRepository: UserBlockingRepository,
    open val basketBlockingRepository: BasketBlockingRepository
) {
    fun changePassword(id: String, password: String): Mono<Boolean> {
        return Mono.fromSupplier {
            val passwordCredentials = passwordService.encodePassword(password)
            dsl.update(CLIENT)
                .set(CLIENT.PASSWORD, passwordCredentials.first)
                .set(CLIENT.SALT, passwordCredentials.second)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }
    }

    fun verifyPassword(clientModel: AuthorizationClientModel): ClientModel {
        if (clientModel.email == null || clientModel.password == null) {
            throw Exception("Введены не все поля!")
        }

        val possibleClient = userBlockingRepository.getByEmail(clientModel.email!!)
            ?: throw Exception("Данного пользователя не существует!")

        if (passwordService.verifyPassword(
                clientModel.password!!,
                Pair(possibleClient.password!!, possibleClient.salt!!)
            )
        ) {
            return possibleClient
        } else {
            throw Exception("Пароль неверный!")
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

        val newClientModel = com.fs.domain.jooq.tables.pojos.Client(
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


    fun update(newClientModel: ClientModel): Boolean {

        val oldClientModel: ClientModel = userBlockingRepository.getById(newClientModel.id)!!

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
            .set(CLIENT.PHONE_NUMBER, newClientModel.phoneNumber ?: oldClientModel.phoneNumber)
            .set(CLIENT.TELEGRAM_USERNAME, newClientModel.telegramUsername ?: oldClientModel.telegramUsername)
            .set(CLIENT.USERNAME, newClientModel.username ?: oldClientModel.username)
            .where(CLIENT.ID.eq(newClientModel.id))
            .execute() == 1
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
            username = null

        )
        private val defaultClientRole = ClientRoleModel.CLIENT
        private const val DEFAULT_ACTIVE_STATUS: Boolean = false
    }
}