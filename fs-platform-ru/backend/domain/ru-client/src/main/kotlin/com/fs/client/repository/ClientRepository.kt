package com.fs.client.repository

import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.jooq.tables.Basket
import com.fs.domain.jooq.tables.Cities
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Country
import com.fs.domain.jooq.tables.Order.Companion.ORDER
import com.fs.domain.jooq.tables.pojos.Client
import com.fs.domain.jooq.tables.records.ClientRecord
import com.fs.domain.jooq.tables.references.BASKET
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


abstract class ClientRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val basketRepository: BasketRepository
) {

    fun getClintById(id: Long): Mono<ClientModel> {
        return Mono.from(
            dsl.select(CLIENT.asterisk()).from(CLIENT)
                .join(Basket.BASKET).on(CLIENT.BASKET_ID.eq(Basket.BASKET.ID))
                .join(Cities.CITIES).on(CLIENT.CITY_ID.eq(Cities.CITIES.ID))
                .join(Country.COUNTRY).on(Cities.CITIES.COUNTRY_CODE.eq(Country.COUNTRY.CODE))
                .where(CLIENT.ID.eq(id))
        )
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
    }

    fun updateClientInfo(id: Long, newClientModel: ClientModel): Mono<Boolean> {
        return Mono.fromSupplier {
            val oldClientModel: ClientModel = getClintById(id).block()!!

            dsl.update(CLIENT)
                .set(CLIENT.CITY_ID, newClientModel.cityId ?: oldClientModel.cityId)
                .set(CLIENT.BIRTHDAY, newClientModel.birthday ?: oldClientModel.birthday)
                .set(
                    CLIENT.EDUCATION_STATUS,
                    newClientModel.educationModelStatus ?: oldClientModel.educationModelStatus
                )
                .set(CLIENT.EMAIL, newClientModel.email ?: oldClientModel.email)
                .set(CLIENT.EMPLOYMENT, newClientModel.employment ?: oldClientModel.employment)
                .set(CLIENT.FIRST_NAME, newClientModel.firstName ?: oldClientModel.firstName)
                .set(CLIENT.LAST_NAME, newClientModel.lastName ?: oldClientModel.lastName)
                .set(CLIENT.PHONE_NUMBER, newClientModel.phoneNumber ?: oldClientModel.phoneNumber)
                .set(CLIENT.TELEGRAM_USERNAME, newClientModel.telegramUsername ?: oldClientModel.telegramUsername)
                .set(CLIENT.USERNAME, newClientModel.username ?: oldClientModel.username)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }

    }

    fun changeActiveStatus(id: Long, activeStatus: Boolean): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(CLIENT)
                .set(CLIENT.ACTIVATE_STATUS, activeStatus)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }
    }

    fun changePassword(id: Long, password: String): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(CLIENT)
                .set(CLIENT.PASSWORD, password)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }
    }

    fun changeRole(id: Long, role: ClientRoleModel): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.update(CLIENT)
                .set(CLIENT.ROLE, role)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }
    }

    fun insert(clientModel: ClientModel) =
        Mono.fromSupplier {

            val newClientRecord: ClientRecord = dsl.newRecord(CLIENT)
            val basket: BasketModel = basketRepository.insert().block()!!
            clientModel.basketId = basket.id
            newClientRecord.from(clientModel)
            newClientRecord.reset(CLIENT.ID)
            newClientRecord.store()
            return@fromSupplier newClientRecord.into(Client::class.java)
        }
            .map(converter::toModel)

    fun deleteClient(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            dsl.deleteFrom(BASKET)
                .where(BASKET.ID.eq(CLIENT.BASKET_ID))
                .execute()
            dsl.deleteFrom(CLIENT)
                .where(CLIENT.ID.eq(id))
                .execute() == 1
        }
    }


    fun delete(id: Long): Mono<Boolean> {
        return Mono.fromSupplier {
            val clientRecord: ClientRecord? = dsl.fetchOne(CLIENT, CLIENT.ID.eq(id))
            if (clientRecord != null) {
                dsl.deleteFrom(CLIENT)
                    .where(CLIENT.ID.eq(id))
                    .execute()
                dsl.deleteFrom(BASKET)
                    .where(BASKET.ID.eq(clientRecord.basketId))
                    .execute()
                dsl.deleteFrom(ORDER)
                    .where(ORDER.BASKET_ID.eq(clientRecord.basketId))
            }
            false
        }
    }

    fun getAllClients(): Flux<ClientModel> {
        return Flux.from(
            dsl.selectFrom(CLIENT)
        )
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
    }

}



