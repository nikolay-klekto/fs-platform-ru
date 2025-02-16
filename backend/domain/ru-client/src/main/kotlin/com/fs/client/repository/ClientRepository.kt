package com.fs.client.repository

import com.fs.client.converter.ClientModelConverter
import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.ru.AuthorizationClientModel
import com.fs.client.ru.ClientInputModel
import com.fs.client.ru.ClientModel
import com.fs.client.service.PasswordService
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Client
import com.fs.domain.jooq.tables.records.ClientRecord
import com.fs.domain.jooq.tables.references.BASKET
import com.fs.service.ru.errors.ErrorModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class ClientRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val clientBlockingRepository: ClientBlockingRepository,
    open val passwordService: PasswordService
) {

    suspend fun getClintById(id: String?): ClientModel? =
        withContext(Dispatchers.IO) {
            clientBlockingRepository.getById(id)
        }

    suspend fun getAllClients(): List<ClientModel> =
        withContext(Dispatchers.IO) {
            dsl.selectFrom(CLIENT)
                .map { it.into(Client::class.java) }
                .map(converter::toModel)
        }

    suspend fun updateClientInfo(newClientModel: ClientInputModel): Boolean =
        withContext(Dispatchers.IO) {
            clientBlockingRepository.update(newClientModel)
        }

    suspend fun changeActiveStatus(id: String, activeStatus: Boolean): Boolean =
        withContext(Dispatchers.IO) {
            dsl.update(CLIENT)
                .set(CLIENT.ACTIVATE_STATUS, activeStatus)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }

    suspend fun changePassword(id: String, password: String): Boolean =
        withContext(Dispatchers.IO) {
            val passwordCredentials = passwordService.encodePassword(password)
            dsl.update(CLIENT)
                .set(CLIENT.PASSWORD, passwordCredentials.first)
                .set(CLIENT.SALT, passwordCredentials.second)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }

    suspend fun verifyPassword(clientModel: AuthorizationClientModel): ErrorModel<Boolean> =
        withContext(Dispatchers.IO) {
            if (clientModel.email == null || clientModel.password == null) {
                throw Exception("Введены не все поля!")
            }

            val possibleClient = clientBlockingRepository.getByEmail(clientModel.email!!)
                ?: throw Exception("Данного пользователя не существует!")

            if (passwordService.verifyPassword(
                    clientModel.password!!,
                    Pair(possibleClient.password!!, possibleClient.salt!!)
                )
            ) {
                ErrorModel(true, null)
            } else {
                throw Exception("Пароль неверный!")
            }
        }

    suspend fun verifyPassword(clientModel: ClientModel): ErrorModel<String> =
        withContext(Dispatchers.IO) {
            if (clientModel.email == null || clientModel.password == null) {
                throw Exception("Введены не все поля!")
            }

            val possibleClient = clientBlockingRepository.getByEmail(clientModel.email!!)
                ?: throw Exception("Данного пользователя не существует!")

            if (passwordService.verifyPassword(
                    clientModel.password!!,
                    Pair(possibleClient.password!!, possibleClient.salt!!)
                )
            ) {
                ErrorModel(possibleClient.id, null)
            } else {
                throw Exception("Пароль неверный!")
            }
        }

    suspend fun deleteClientById(id: String): Boolean =
        withContext(Dispatchers.IO) {
            val clientRecord: ClientRecord? = dsl.fetchOne(CLIENT, CLIENT.ID.eq(id))
            if (clientRecord != null) {
                val result = dsl.deleteFrom(CLIENT)
                    .where(CLIENT.ID.eq(id))
                    .execute() == 1
                dsl.deleteFrom(BASKET)
                    .where(BASKET.ID.eq(clientRecord.basketId))
                    .execute()
                dsl.deleteFrom(ORDER)
                    .where(ORDER.BASKET_ID.eq(clientRecord.basketId))
                    .execute()
                result
            } else {
                false
            }
        }
}
