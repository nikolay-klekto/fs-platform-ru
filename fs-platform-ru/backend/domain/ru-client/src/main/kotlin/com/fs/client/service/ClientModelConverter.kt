package com.fs.client.service

import com.fs.client.ru.ClientModel
import com.fs.client.ru.converter.ModelConverter
import com.fs.domain.jooq.tables.pojos.Client
import org.springframework.stereotype.Service

@Service
class ClientModelConverter : ModelConverter<Client, ClientModel> {
    override fun toModel(rawObject: Client): ClientModel {
        return ClientModel(
            id = rawObject.id!!,
            basketId = rawObject.basketId,
            cityId = rawObject.cityId,
            activateStatus = rawObject.activateStatus,
            birthday = rawObject.birthday,
            dateCreated = rawObject.dateCreated,
            educationModelStatus = rawObject.educationStatus,
            email = rawObject.email,
            employment = rawObject.employment,
            firstName = rawObject.firstName,
            lastName = rawObject.lastName,
            orderQuantity = rawObject.orderQuantity,
            password = rawObject.password,
            phoneNumber = rawObject.phoneNumber,
            role = rawObject.role,
            telegramUsername = rawObject.telegramUsername,
            username = rawObject.username,
        )
    }

    override fun fromModel(modelObject: ClientModel): Client {
        return Client(
            modelObject.id,
            modelObject.basketId,
            modelObject.cityId,
            modelObject.activateStatus,
            modelObject.birthday,
            modelObject.dateCreated,
            modelObject.educationModelStatus,
            modelObject.email,
            modelObject.employment,
            modelObject.firstName,
            modelObject.lastName,
            modelObject.orderQuantity,
            modelObject.password,
            modelObject.phoneNumber,
            modelObject.role,
            modelObject.telegramUsername,
            modelObject.username,
        )
    }
}