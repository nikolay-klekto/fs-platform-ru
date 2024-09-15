//package com.fs.client.config
//
//import com.fs.client.controller.*
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//
//@Configuration
//open class ControllerConfig(
//    private val repositoryConfig: RepositoryConfig
//) {
//
//    @Bean
//    open fun addressController(): AddressController{
//        return AddressController(repositoryConfig.addressRepository())
//    }
//
//    @Bean
//    open fun basketController(): BasketController{
//        return BasketController(repositoryConfig.basketRepository())
//    }
//
//    @Bean
//    open fun cityController(): CityController{
//        return CityController(repositoryConfig.cityRepository())
//    }
//
//    @Bean
//    open fun clientController(): ClientController{
//        return ClientController(repositoryConfig.clientRepository())
//    }
//
//    @Bean
//    open fun companyController(): CompanyController{
//        return CompanyController(repositoryConfig.companyRepository())
//    }
//
//    @Bean
//    open fun countryController(): CountryController{
//        return CountryController(repositoryConfig.countryRepository())
//    }
//
//    @Bean
//    open fun officeController(): OfficeController{
//        return OfficeController(repositoryConfig.officeRepository())
//    }
//
//    @Bean
//    open fun orderController(): OrderController{
//        return OrderController(repositoryConfig.orderRepository())
//    }
//
//    @Bean
//    open fun partnerController(): PartnerController{
//        return PartnerController(repositoryConfig.partnerRepository())
//    }
//
//    @Bean
//    open fun positionController(): PositionController{
//        return PositionController(repositoryConfig.positionRepository())
//    }
//
//    @Bean
//    open fun reviewController(): ReviewController{
//        return ReviewController(repositoryConfig.reviewRepository())
//    }
//
//    @Bean
//    open fun serviceController(): ServiceController{
//        return ServiceController(repositoryConfig.internshipTypeRepository())
//    }
//}