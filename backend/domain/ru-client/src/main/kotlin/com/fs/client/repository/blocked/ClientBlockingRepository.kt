package com.fs.client.repository.blocked

import com.fs.client.converter.ClientModelConverter
import com.fs.client.ru.ClientInputModel
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.pojos.Client
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

abstract class ClientBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val cityBlockingRepository: CityBlockingRepository
) {

    suspend fun getById(clientId: String?): ClientModel? =
        withContext(Dispatchers.IO) {
            dsl.select(CLIENT.asterisk()).from(CLIENT)
                .where(CLIENT.ID.eq(clientId))
                .map { it.into(Client::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun isEmailExist(email: String): Boolean =
        withContext(Dispatchers.IO) {
            dsl.selectCount().from(CLIENT)
                .where(CLIENT.EMAIL.eq(email))
                .first()
                .map { it.into(Int::class.java) } > 0
        }

    private suspend fun getByPhone(clientPhoneNumber: String): ClientModel? =
        withContext(Dispatchers.IO) {
            dsl.selectFrom(CLIENT).where(CLIENT.PHONE_NUMBER.eq(clientPhoneNumber))
                .map { it.into(Client::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun getByEmail(clientEmail: String): ClientModel? =
        withContext(Dispatchers.IO) {
            dsl.selectFrom(CLIENT).where(CLIENT.EMAIL.eq(clientEmail))
                .map { it.into(Client::class.java) }
                .map(converter::toModel)
                .firstOrNull()
        }

    suspend fun getIdByEmail(clientEmail: String): String? =
        withContext(Dispatchers.IO) {
            dsl.select(CLIENT.ID).from(CLIENT).where(CLIENT.EMAIL.eq(clientEmail))
                .map { it.into(String::class.java) }
                .firstOrNull()
        }

    suspend fun update(newClientModel: ClientInputModel): Boolean =
        withContext(Dispatchers.IO) {
            val oldClientModel: ClientModel = getById(newClientModel.id)!!

            var cityId = oldClientModel.cityId

            if (newClientModel.city != null) {
                cityId = cityBlockingRepository.getCityIdByName(newClientModel.city)
                    ?: cityBlockingRepository.insertCityByName(newClientModel.city!!).id
            }

            dsl.update(CLIENT)
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
