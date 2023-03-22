package com.fs.client

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.transaction.annotation.EnableTransactionManagement


@SpringBootApplication
@EnableTransactionManagement
//@EnableDiscoveryClient
open class ClientServiceApp {

}

fun main(args: Array<String>) {
    runApplication<ClientServiceApp>(*args)

}


//@SpringBootApplication
//class ClientServiceApp
//
//fun main(args: Array<String>) {
//
//    SpringApplicationBuilder()
//        .sources(
//            SpringAppConfig::class.java,
//            JacksonConfig::class.java,
//            JooqConfig::class.java,
//            RepositoryConfig::class.java,
//            ControllerConfig::class.java,
//            ObjectMapperWebFluxConfigurer::class.java,
////            DatasourceConfig::class.java
//        )
//        .run(*args)
////    runApplication<ClientServiceApp>(*args)
//}


//object ClientServiceApp {
//    @JvmStatic
//    fun main(args: Array<String>) {
//        val client: Client = Client(
//            1, 1, 1, true, LocalDateTime.now(),
//            LocalDateTime.now(), EducationModel.OTHER, "", EmploymentModel.EMPLOYEE,
//            "", "", 2, "", "", ClientRoleModel.CLIENT, "", ""
//        )
//        val clientModel: ClientModel = ClientModelConverter().toModel(client)
//        println(clientModel)
//
//        val reverseClient: Client = ClientModelConverter().fromModel(clientModel)
//
//        println(reverseClient)
//
//
//
//        SpringApplicationBuilder()
//            .sources(
//                JacksonConfig::class.java,
//                JooqConfig::class.java,
//                RepositoryConfig::class.java,
//                ControllerConfig::class.java,
//                ObjectMapperWebFluxConfigurer::class.java,
//            )
//            .run(args.toString())
////        .run(appName = "ru", componentName = "ru-client")
//    }
//}
