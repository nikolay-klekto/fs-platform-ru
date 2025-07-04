package com.fs.client.converter

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
            educationStatus = rawObject.educationStatus,
            email = rawObject.email,
            employment = rawObject.employment,
            firstName = rawObject.firstName,
            lastName = rawObject.lastName,
            password = rawObject.password,
            phoneNumber = rawObject.phoneNumber,
            salt = rawObject.salt,
            role = rawObject.role,
            telegramUsername = rawObject.telegramUsername
        )
    }

    override fun fromModel(modelObject: ClientModel): Client {
        return Client(
            modelObject.basketId,
            modelObject.cityId,
            modelObject.activateStatus,
            modelObject.birthday,
            modelObject.dateCreated,
            modelObject.educationStatus,
            modelObject.email,
            modelObject.employment,
            modelObject.firstName,
            modelObject.lastName,
            modelObject.password,
            modelObject.phoneNumber,
            modelObject.role,
            modelObject.telegramUsername,
            modelObject.id,
        )
    }
}