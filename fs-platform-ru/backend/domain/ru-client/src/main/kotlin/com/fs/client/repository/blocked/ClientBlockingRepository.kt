package com.fs.client.repository.blocked

import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.pojos.Client
import com.fs.domain.jooq.tables.records.ClientRecord
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext
import java.time.LocalDateTime

abstract class ClientBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository
) {

    fun getById(clientId: Long?): ClientModel? {
        return dsl.select(CLIENT.asterisk()).from(CLIENT)
            .where(CLIENT.ID.eq(clientId))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun insert(clientModel: ClientModel): ClientModel {

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
        val basket: BasketModel = basketBlockingRepository.insert()
        val newClientModel = ClientModel(
            defaultClientId,
            basket.id,
            clientModel.cityId,
            defaultActiveStatus,
            clientModel.birthday,
            LocalDateTime.now(),
            clientModel.educationStatus,
            clientModel.email,
            clientModel.employment,
            clientModel.firstName,
            clientModel.lastName,
            clientModel.password,
            clientModel.phoneNumber,
            clientModel.role ?: defaultClientRole,
            clientModel.telegramUsername,
            clientModel.username
        )

        newClientRecord.from(newClientModel)
        newClientRecord.reset(CLIENT.ID)
        newClientRecord.store()
        return converter.toModel(newClientRecord.into(Client::class.java))

    }

    companion object {

        private const val defaultClientId: Long = 1
        private val defaultClientRole = ClientRoleModel.CLIENT
        private const val defaultActiveStatus: Boolean = false
    }
}