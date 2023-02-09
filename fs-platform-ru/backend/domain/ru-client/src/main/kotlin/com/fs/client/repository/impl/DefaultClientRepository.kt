package com.fs.client.repository.impl

import com.fs.client.repository.ClientRepository
import com.fs.client.ru.ClientModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.tables.Basket.BASKET
import com.fs.domain.tables.Cities.CITIES
import com.fs.domain.tables.Client.CLIENT
import com.fs.domain.tables.Country.COUNTRY
import com.fs.domain.tables.pojos.Client
import org.jooq.DSLContext
import reactor.core.publisher.Mono

class DefaultClientRepository(
    private val dslContext: DSLContext,
    private val converter: ClientModelConverter
) : ClientRepository {

    override fun getClintById(id: Int): Mono<ClientModel> {
        return Mono.from(
            dslContext.select(CLIENT.asterisk()).from(CLIENT)
                .join(BASKET).on(CLIENT.BASKET_ID.eq(BASKET.ID))
                .join(CITIES).on(CLIENT.CITY_ID.eq(CITIES.ID))
                .join(COUNTRY).on(CITIES.COUNTRY_CODE.eq(COUNTRY.CODE))
                .where(CLIENT.ID.eq(id))
        )
            .map { it.into(Client::class.java) }
            .map(converter::toModel)


    }

    override fun clientById(id: Int): ClientModel {
        return dslContext.select(CLIENT.asterisk()).from(CLIENT)
            .join(BASKET).on(CLIENT.BASKET_ID.eq(BASKET.ID))
            .join(CITIES).on(CLIENT.CITY_ID.eq(CITIES.ID))
            .join(COUNTRY).on(CITIES.COUNTRY_CODE.eq(COUNTRY.CODE))
            .where(CLIENT.ID.eq(id))

            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .first()
    }

    override fun updateClientInfo(id: Int): Mono<Long> {
        TODO("Not yet implemented")
    }

    override fun createClient(clientModel: ClientModel): Mono<Long> {
        TODO("Not yet implemented")
    }

    override fun deleteClient(id: Int): Mono<Long> {
        TODO("Not yet implemented")
    }
}