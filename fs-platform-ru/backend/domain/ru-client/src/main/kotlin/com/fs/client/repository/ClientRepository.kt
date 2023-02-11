package com.fs.client.repository

import com.fs.client.ru.ClientModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.jooq.tables.Basket
import com.fs.domain.jooq.tables.Cities
import com.fs.domain.jooq.tables.Client
import com.fs.domain.jooq.tables.Country
import org.jooq.DSLContext
import reactor.core.publisher.Mono


abstract class ClientRepository(open val dsl: DSLContext, open val converter: ClientModelConverter) {

    fun getClintById(id: Int): Mono<ClientModel> {
        return Mono.from(
            dsl.select(Client.CLIENT.asterisk()).from(Client.CLIENT)
                .join(Basket.BASKET).on(Client.CLIENT.BASKET_ID.eq(Basket.BASKET.ID))
                .join(Cities.CITIES).on(Client.CLIENT.CITY_ID.eq(Cities.CITIES.ID))
                .join(Country.COUNTRY).on(Cities.CITIES.COUNTRY_CODE.eq(Country.COUNTRY.CODE))
                .where(Client.CLIENT.ID.eq(id))
        )
            .map { it.into(com.fs.domain.jooq.tables.pojos.Client::class.java) }
            .map(converter::toModel)


    }

//    fun getClintById(id: Int): Mono<ClientModel>
//
//    fun clientById(id: Int): ClientModel
//
//    fun updateClientInfo(id: Int): Mono<Long>
//
//    fun createClient(clientModel: ClientModel): Mono<Long>
//
//    fun deleteClient(id: Int): Mono<Long>
}