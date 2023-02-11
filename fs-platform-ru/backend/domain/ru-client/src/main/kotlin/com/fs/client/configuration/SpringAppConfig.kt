//package com.fs.client.configuration
//
//import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
//import org.springframework.boot.web.servlet.server.ServletWebServerFactory
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.orm.hibernate5.LocalSessionFactoryBean
//
//
//@Configuration
//class SpringAppConfig {
//
//    @Bean
//    fun servletWebServerFactory(): ServletWebServerFactory? {
//        val factory = TomcatServletWebServerFactory()
//        factory.port = 8083
////        factory.contextPath = "/application.properties"
//        return factory
//    }
//
//    @Bean(name = ["entityManagerFactory"])
//    fun sessionFactory(): LocalSessionFactoryBean? {
//
//        return LocalSessionFactoryBean()
//    }
//
//}