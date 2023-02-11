//package com.fs.client.configuration
//
//import com.fasterxml.jackson.annotation.JsonInclude
//import com.fasterxml.jackson.databind.DeserializationFeature
//import org.springframework.context.annotation.Configuration
//import org.springframework.http.codec.ServerCodecConfigurer
//import org.springframework.http.codec.json.Jackson2JsonDecoder
//import org.springframework.http.codec.json.Jackson2JsonEncoder
//import org.springframework.web.reactive.config.WebFluxConfigurer
//
//@Configuration
////@EnableWebFlux
//class ObjectMapperWebFluxConfigurer : WebFluxConfigurer {
//
//    private val objectMapper = JacksonConfig().objectMapper()
//
//    override fun configureHttpMessageCodecs(configurer: ServerCodecConfigurer) {
//        configurer.defaultCodecs().jackson2JsonEncoder(
//            Jackson2JsonEncoder(
//                objectMapper
//                    .setSerializationInclusion(JsonInclude.Include.NON_EMPTY)
//            )
//        )
//
//        configurer.defaultCodecs().jackson2JsonDecoder(
//            Jackson2JsonDecoder(
//                objectMapper
//                    .enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
//            )
//        )
//    }
//}
//
//
////@Configuration
////
////class ObjectMapperWebFluxConfigurer
////{
////    private val objectMapper = JacksonConfig().objectMapper()
////        @Bean
////        fun javatimeModule(): JavaTimeModule {
////            return JavaTimeModule()
////        }
////
////        @Bean
////        fun jackson2ObjectMapperBuilderCustomizer(): Jackson2ObjectMapperBuilderCustomizer {
////            return Jackson2ObjectMapperBuilderCustomizer { jacksonObjectMapperBuilder: Jackson2ObjectMapperBuilder ->
////                jacksonObjectMapperBuilder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
////                    .mixIn(MyClass::class.java, MyClassMixin::class.java)
////            }
////        }
////
////        @Bean
////        fun jackson2JsonEncoder(): Jackson2JsonEncoder {
////            return Jackson2JsonEncoder(objectMapper)
////        }
////
////        @Bean
////        fun jackson2JsonDecoder(): Jackson2JsonDecoder {
////            return Jackson2JsonDecoder(objectMapper)
////        }
////
////        @Bean
////        fun webFluxConfigurer(encoder: Jackson2JsonEncoder?, decoder: Jackson2JsonDecoder?): WebFluxConfigurer {
////            return object : WebFluxConfigurer {
////                override fun configureHttpMessageCodecs(configurer: ServerCodecConfigurer) {
////                    configurer.defaultCodecs().jackson2JsonEncoder(encoder!!)
////                    configurer.defaultCodecs().jackson2JsonDecoder(decoder!!)
////                }
////            }
////        }
////    }
////
//
//
//
