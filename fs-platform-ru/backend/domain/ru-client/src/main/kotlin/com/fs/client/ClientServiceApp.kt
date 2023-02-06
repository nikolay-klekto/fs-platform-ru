package com.fs.client

import com.fs.client.configuration.ControllerConfig
import com.fs.client.configuration.JacksonConfig
import com.fs.client.configuration.JooqConfig
import com.fs.client.configuration.RepositoryConfig
import com.fs.client.ru.ClientModel
import com.fs.client.ru.enums.ClientRoleModel
import com.fs.client.ru.enums.EducationModel
import com.fs.client.ru.enums.EmploymentModel
import com.fs.client.service.ClientModelConverter
import com.fs.domain.tables.pojos.Client
import org.springframework.boot.builder.SpringApplicationBuilder
import java.time.LocalDateTime

//@SpringBootApplication
//class ClientServiceApp
//
//fun main(args: Array<String>) {
//    val client: Client = Client(
//        1, 1,  1, true, LocalDateTime.now(), LocalDateTime.now(), EducationModel.OTHER, "",
//        EmploymentModel.EMPLOYEE, "", "", 2, "", "", ClientRoleModel.CLIENT, "", ""
//    )
//    val clientModel: ClientModel = ClientModelConverter().toModel(client)
//    println(clientModel)
//
//    val reverseClient: Client = ClientModelConverter().fromModel(clientModel)
//
//    println(reverseClient)
//
//
//    SpringApplicationBuilder()
//        .sources(
//            JacksonConfig::class.java,
//            JooqConfig::class.java,
//            RepositoryConfig::class.java,
//            ControllerConfig::class.java)
//        .run(8888, "fs", "ru-client")
//    runApplication<ClientServiceApp>(*args)
//
//
//}

object ClientServiceApp {
    @JvmStatic
    fun main(args: Array<String>) {
        val client: Client = Client(
            1, 1, 1, true, LocalDateTime.now(),
            LocalDateTime.now(), EducationModel.OTHER, "", EmploymentModel.EMPLOYEE,
            "", "", 2, "", "", ClientRoleModel.CLIENT, "", ""
        )
        val clientModel: ClientModel = ClientModelConverter().toModel(client)
        println(clientModel)

        val reverseClient: Client = ClientModelConverter().fromModel(clientModel)

        println(reverseClient)



        SpringApplicationBuilder()
            .sources(
                JacksonConfig::class.java,
                JooqConfig::class.java,
                RepositoryConfig::class.java,
                ControllerConfig::class.java
            )
            .run(args.toString())
//        .run(appName = "ru", componentName = "ru-client")
    }
}