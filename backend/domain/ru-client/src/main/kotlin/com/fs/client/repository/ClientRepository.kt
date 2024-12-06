package com.fs.client.repository

import com.fs.client.repository.blocked.ClientBlockingRepository
import com.fs.client.ru.ClientModel
import com.fs.client.converter.ClientModelConverter
import com.fs.client.ru.AuthorizationClientModel
import com.fs.client.service.PasswordService
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Client
import com.fs.domain.jooq.tables.records.ClientRecord
import com.fs.domain.jooq.tables.references.BASKET
import com.fs.service.ru.errors.ErrorModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


abstract class ClientRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val clientBlockingRepository: ClientBlockingRepository,
    open val passwordService: PasswordService
) {

    fun getClintById(id: String?): Mono<ClientModel> {
        return Mono.fromSupplier {
            return@fromSupplier clientBlockingRepository.getById(id)
        }
    }

    fun getAllClients(): Flux<ClientModel> {
        return Flux.from(
            dsl.selectFrom(CLIENT)
        )
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
    }

    fun updateClientInfo(newClientModel: ClientModel): Mono<Boolean> {
        return Mono.fromSupplier {
            clientBlockingRepository.update(newClientModel)
        }
    }

    fun changeActiveStatus(id: String, activeStatus: Boolean): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(CLIENT)
                .set(CLIENT.ACTIVATE_STATUS, activeStatus)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }
    }

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

    fun verifyPassword(clientModel: AuthorizationClientModel): Mono<ErrorModel<Boolean>> {
        return Mono.fromSupplier {
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
                return@fromSupplier ErrorModel(true, null)
            } else {
                throw Exception("Пароль неверный!")
            }
        }
    }

    //Should to think how to realize this function

//    fun changeRole(id: Long, role: ClientRoleModel): Mono<Boolean> {
//        return Mono.fromSupplier {
//
//            val updatableClientModel = dsl.update(CLIENT)
//                .set(CLIENT.ROLE, role)
//                .where(CLIENT.ID.eq(id))
//                .returning()
//                .map { it.into(Client::class.java) }
//                .map(converter::toModel)
//                .first()
//
//            val oldPartnerClientId = dsl.select(Partner.PARTNER.CLIENT_ID).from(Partner.PARTNER)
//                .where(Partner.PARTNER.CLIENT_ID.eq(id))
//                .map { it.into(Long::class.java) }
//
//            if(role == ClientRoleModel.PARTNER && oldPartnerClientId.isEmpty()){
//
//                partnerRepository.insert(updatableClientModel)
//
//            }
//
//            return@fromSupplier true
//        }
//    }

    fun insertClient(clientModel: ClientModel): Mono<ErrorModel<ClientModel>> {
        return Mono.fromSupplier {
            ErrorModel(clientBlockingRepository.insert(clientModel), null)
        }
    }

    fun verifyPassword(clientModel: ClientModel): Mono<ErrorModel<String>>{
        return Mono.fromSupplier {
            if(clientModel.email == null || clientModel.password == null){
                throw Exception("Введены не все поля!")
            }

            val possibleClient = clientBlockingRepository.getByEmail(clientModel.email!!)
                ?: throw Exception("Данного пользователя не существует!")

            if(passwordService.verifyPassword(clientModel.password!!,
                Pair(possibleClient.password!!, possibleClient.salt!!))){
                return@fromSupplier ErrorModel(possibleClient.id, null)
            }else{
                throw Exception("Пароль неверный!")
            }

        }
    }


    fun deleteClientById(id: String): Mono<Boolean> {
        return Mono.fromSupplier {
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
                return@fromSupplier result
            }
            false
        }
    }

}



