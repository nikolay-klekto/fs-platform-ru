package com.fs.client

import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.ru.enums.EducationModel
import com.fs.client.ru.enums.EmploymentModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.tables.pojos.Client
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.time.LocalDateTime

@SpringBootApplication
class ClientServiceApp

fun main(args: Array<String>) {
    val client: Client = Client(
        1, 1, 1, 1, true, LocalDateTime.now(), LocalDateTime.now(), EducationModel.OTHER, "",
        EmploymentModel.EMPLOYEE, "", "", 2, "", "", ClientRoleModel.CLIENT, "", ""
    )
    val clientModel: ClientModel = ClientModelConverter().toModel(client)
    println(clientModel)

    val reverseClient: Client = ClientModelConverter().fromModel(clientModel)

    println(reverseClient)
    runApplication<ClientServiceApp>(*args)


}