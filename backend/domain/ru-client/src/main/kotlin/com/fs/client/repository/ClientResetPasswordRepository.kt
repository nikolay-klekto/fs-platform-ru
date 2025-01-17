package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.service.EmailService
import com.fs.domain.jooq.tables.ClientsResetPasswords.Companion.CLIENTS_RESET_PASSWORDS
import com.fs.domain.jooq.tables.pojos.ClientsResetPasswords
import com.fs.service.ru.errors.ErrorModel
import org.jooq.DSLContext
import reactor.core.publisher.Mono

abstract class ClientResetPasswordRepository(
    open val dsl: DSLContext,
    open val clientBlockingRepository: ClientBlockingRepository,
    open val emailService: EmailService
) {

    fun insertClientResetPassword(email: String): Mono<ErrorModel<Boolean>> {
        return Mono.fromSupplier {
            val newClientPasswordModel = ClientsResetPasswords(
                clientEmail = email,
                code = generateResetCode()
            )

            if (clientBlockingRepository.isEmailExist(newClientPasswordModel.clientEmail!!)) {
                emailService.sendResetPasswordEmail(email, newClientPasswordModel.code.toString())
                if (isEmailExistInPasswordStore(newClientPasswordModel.clientEmail!!)) {
                    return@fromSupplier ErrorModel(update(newClientPasswordModel), null)
                } else {
                    val newClientPasswordRecord = dsl.newRecord(CLIENTS_RESET_PASSWORDS)
                    newClientPasswordRecord.from(newClientPasswordModel)
                    newClientPasswordRecord.reset(CLIENTS_RESET_PASSWORDS.ID)
                    return@fromSupplier ErrorModel(newClientPasswordRecord.store() == 1, null)
                }
            } else {
                return@fromSupplier ErrorModel(null, "Аккаунт не найден, проверьте введенные данные")
            }
        }
    }

    fun checkCode(newClientPasswordModel: ClientsResetPasswords): Mono<ErrorModel<String>>{
        return Mono.fromSupplier {
            val clientEmail = newClientPasswordModel.clientEmail!!
            if(isEmailExistInPasswordStore(clientEmail)){
                val rightCode = dsl.select(CLIENTS_RESET_PASSWORDS.CODE).from(CLIENTS_RESET_PASSWORDS)
                    .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(clientEmail))
                    .first()
                    .map{it.into(Int::class.java)}
                val result = rightCode == newClientPasswordModel.code
                if(result){
                    val clientId = clientBlockingRepository.getIdByEmail(clientEmail)
                    deleteCheckCode(clientEmail)
                    return@fromSupplier ErrorModel(clientId, null)
                }else{
                    return@fromSupplier ErrorModel(null, "Пароль неверный, попробуйте заново")
                }
            }else{
                return@fromSupplier ErrorModel(null, "Пожалуйста, попробуйте заново")
            }
        }
    }

    private fun isEmailExistInPasswordStore(email: String): Boolean{
        return dsl.selectCount().from(CLIENTS_RESET_PASSWORDS)
            .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(email))
            .first()
            .map { it.into(Int::class.java) } > 0
    }

    fun update(newClientPasswordModel: ClientsResetPasswords): Boolean {

        return dsl.update(CLIENTS_RESET_PASSWORDS)
            .set(CLIENTS_RESET_PASSWORDS.CODE, newClientPasswordModel.code)
            .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(newClientPasswordModel.clientEmail))
            .execute() == 1
    }

    private fun deleteCheckCode(email: String){
        dsl.deleteFrom(CLIENTS_RESET_PASSWORDS)
            .where(CLIENTS_RESET_PASSWORDS.CLIENT_EMAIL.eq(email))
            .execute()
    }

    private fun generateResetCode(): Int {
        return (100000..999999).random() // Пример генерации 6-значного кода
    }
}