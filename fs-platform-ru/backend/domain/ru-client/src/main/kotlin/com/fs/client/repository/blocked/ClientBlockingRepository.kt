package com.fs.client.repository.blocked

import com.fs.client.ru.ClientModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.jooq.tables.Basket
import com.fs.domain.jooq.tables.City.Companion.CITY
import com.fs.domain.jooq.tables.Client.Companion.CLIENT
import com.fs.domain.jooq.tables.Country
import com.fs.domain.jooq.tables.pojos.Client
import com.fs.domain.jooq.tables.records.ClientRecord
import com.fs.service.ru.BasketModel
import org.jooq.DSLContext

abstract class ClientBlockingRepository(
    open val dsl: DSLContext,
    open val converter: ClientModelConverter,
    open val basketBlockingRepository: BasketBlockingRepository
) {

    fun getById(clientId: Long?): ClientModel? {
        return dsl.select(CLIENT.asterisk()).from(CLIENT)
            .join(Basket.BASKET).on(CLIENT.BASKET_ID.eq(Basket.BASKET.ID))
            .join(CITY).on(CLIENT.CITY_ID.eq(CITY.ID))
            .join(Country.COUNTRY).on(CITY.COUNTRY_CODE.eq(Country.COUNTRY.CODE))
            .where(CLIENT.ID.eq(clientId))
            .map { it.into(Client::class.java) }
            .map(converter::toModel)
            .firstOrNull()
    }

    fun insert(clientModel: ClientModel): ClientModel {

        val newClientRecord: ClientRecord = dsl.newRecord(CLIENT)
        val basket: BasketModel = basketBlockingRepository.insert()
        clientModel.basketId = basket.id
        newClientRecord.from(clientModel)
        newClientRecord.reset(CLIENT.ID)
        newClientRecord.store()
        return converter.toModel(newClientRecord.into(Client::class.java))

    }
}