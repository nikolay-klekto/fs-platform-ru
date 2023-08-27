//package com.fs.client.config
//
//import com.fs.client.repository.*
//import com.fs.client.repository.impl.*
//import com.fs.client.service.ScheduledTasks
//import com.fs.client.service.TotalPriceMatcher
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//
//@Configuration
//open class RepositoryConfig(
//    private val jooqConfig: JooqConfig,
//    private val converterConfig: ConverterConfig,
//    private val serviceConfig: ServiceConfig
//) {
//    @Bean
//    open fun addressRepository(): AddressRepository{
//        return DefaultAddressRepository(
//            jooqConfig.dsl(),
//            converterConfig.addressModelConverter()
//        )
//    }
//
//    @Bean
//    open fun cityRepository(): CityRepository {
//        return DefaultCityRepository(
//            jooqConfig.dsl(),
//            converterConfig.cityModelConverter()
//        )
//    }
//
//    @Bean
//    open fun basketRepository(): BasketRepository {
//        return DefaultBasketRepository(
//            jooqConfig.dsl(),
//            converterConfig.basketModelConverter()
//        )
//    }
//
//    @Bean
//    open fun clientRepository(): ClientRepository {
//        return DefaultClientRepository(
//            jooqConfig.dsl(),
//            converterConfig.clientModelConverter(),
//            basketRepository()
//        )
//    }
//
//    @Bean
//    open fun companyRepository(): CompanyRepository {
//        return DefaultCompanyRepository(
//            jooqConfig.dsl(),
//            converterConfig.companyModelConverter()
//        )
//    }
//
//    @Bean
//    open fun countryRepository(): CountryRepository {
//        return DefaultCountryRepository(
//            jooqConfig.dsl(),
//            converterConfig.countryModelConverter()
//        )
//    }
//
//    @Bean
//    open fun officeRepository(): OfficeRepository {
//        return DefaultOfficeRepository(
//            jooqConfig.dsl(),
//            converterConfig.officeModelConverter(),
//            addressRepository()
//        )
//    }
//
//    @Bean
//    open fun orderRepository(): OrderRepository {
//        return DefaultOrderRepository(
//            jooqConfig.dsl(),
//            converterConfig.orderModelConverter(),
//            basketRepository(),
//            serviceRepository(),
//            cityRepository(),
//            countryRepository(),
//            serviceConfig.totalPriceMatcher()
//        )
//    }
//
//    @Bean
//    open fun partnerRepository(): PartnerRepository {
//        return DefaultPartnerRepository(
//            jooqConfig.dsl(),
//            converterConfig.partnerModelConverter(),
//            clientRepository()
//        )
//    }
//
//    @Bean
//    open fun positionRepository(): PositionRepository {
//        return DefaultPositionRepository(
//            jooqConfig.dsl(),
//            converterConfig.positionModelConverter()
//        )
//    }
//
//    @Bean
//    open fun reviewRepository(): ReviewRepository {
//        return DefaultReviewRepository(
//            jooqConfig.dsl(),
//            converterConfig.reviewModelConverter()
//        )
//    }
//
//    @Bean
//    open fun serviceRepository(): ServiceRepository {
//        return DefaultServiceRepository(
//            jooqConfig.dsl(),
//            converterConfig.serviceModelConverter()
//        )
//    }
//
//    @Bean
//    open fun scheduledTasks(): ScheduledTasks {
//        return ScheduledTasks(orderRepository())
//    }
//}