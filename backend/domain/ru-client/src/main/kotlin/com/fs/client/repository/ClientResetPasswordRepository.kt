package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.service.EmailService
import com.fs.domain.jooq.tables.ClientsResetPasswords.Companion.CLIENTS_RESET_PASSWORDS
import com.fs.domain.jooq.tables.pojos.ClientsResetPasswords
import com.fs.service.ru.errors.ErrorModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import java.time.LocalDateTime

abstract class ClientResetPasswordRepository(
    open val dsl: DSLContext,
    open val clientBlockingRepository: ClientBlockingRepository,
    open val emailService: EmailService
) {

    suspend fun insertClientResetPassword(email: String): ErrorModel<Boolean> =
        withContext(Dispatchers.IO) {
            val newClientPasswordModel = ClientsResetPasswords(
                clientEmail = email,
                code = generateResetCode(),
                dateCreated = LocalDateTime.now()
            )

            if (clientBlockingRepository.isEmailExist(newClientPasswordModel.clientEmail!!)) {
                emailService.sendResetPasswordEmail(email, newClientPasswordModel.code.toString())
                if (isEmailExistInPasswordStore(newClientPasswordModel.clientEmail!!)) {
                    ErrorModel(update(newClientPasswordModel), null)
                } else {
                    val newClientPasswordRecord = dsl.newRecord(CLIENTS_RESET_PASSWORDS)
                    newClientPasswordRecord.from(newClientPasswordModel)
                    newClientPasswordRecord.reset(CLIENTS_RESET_PASSWORDS.ID)
                    ErrorModel(newClientPasswordRecord.store() == 1, null)
                }
            } else {
                ErrorModel(null, "Аккаунт не найден, проверьте введенные данные")
            }
        }

    suspend fun checkCode(newClientPasswordModel: ClientsResetPasswords): ErrorModel<String> =
        withContext(Dispatchers.IO) {
            val clientEmail = newClientPasswordModel.clientEmail!!
            if (isEmailExistInPasswordStoreAndTimeIsNotExpired(clientEmail)) {
                val rightCode = dsl.select(CLIENTS_RESET_PASSWORDS.CODE).from(CLIENTS_RESET_PASSWORDS)
                    .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(clientEmail))
                    .first()
                    .map { it.into(Int::class.java) }
                val result = rightCode == newClientPasswordModel.code
                if (result) {
                    val clientId = clientBlockingRepository.getIdByEmail(clientEmail)
                    deleteCheckCode(clientEmail)
                    ErrorModel(clientId, null)
                } else {
                    ErrorModel(null, "Пароль неверный, попробуйте заново")
                }
            } else {
                ErrorModel(null, "Этот код уже недействителен. Получите новый, чтобы сменить пароль.")
            }
        }

    private suspend fun isEmailExistInPasswordStore(email: String): Boolean =
        withContext(Dispatchers.IO) {
            dsl.selectCount().from(CLIENTS_RESET_PASSWORDS)
                .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(email))
                .first()
                .map { it.into(Int::class.java) } > 0
        }

    private suspend fun isEmailExistInPasswordStoreAndTimeIsNotExpired(email: String): Boolean =
        withContext(Dispatchers.IO) {
            val twoMinutesAgo = LocalDateTime.now().minusMinutes(2)

            val count = dsl.selectCount()
                .from(CLIENTS_RESET_PASSWORDS)
                .where(
                    CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(email)
                        .and(CLIENTS_RESET_PASSWORDS.DATE_CREATED.greaterOrEqual(twoMinutesAgo))
                )
                .fetchOne(0, Int::class.java) ?: 0  // если null, считаем 0

            count > 0
        }



    suspend fun update(newClientPasswordModel: ClientsResetPasswords): Boolean =
        withContext(Dispatchers.IO) {
            dsl.update(CLIENTS_RESET_PASSWORDS)
                .set(CLIENTS_RESET_PASSWORDS.CODE, newClientPasswordModel.code)
                .set(CLIENTS_RESET_PASSWORDS.DATE_CREATED, newClientPasswordModel.dateCreated)
                .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(newClientPasswordModel.clientEmail))
                .execute() == 1
        }

    private suspend fun deleteCheckCode(email: String) =
        withContext(Dispatchers.IO) {
            dsl.deleteFrom(CLIENTS_RESET_PASSWORDS)
                .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(email))
                .execute()
        }

    private fun generateResetCode(): Int {
        return (100000..999999).random() // Пример генерации 6-значного кода
    }
}
