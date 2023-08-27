//package com.fs.client.config;
//
//import jakarta.persistence.EntityManagerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.jdbc.datasource.SimpleDriverDataSource;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//import javax.sql.DataSource;
//
//@Configuration
//@EnableTransactionManagement
//public class Config {
//
//    @Autowired
//    EntityManagerFactory emf;
//
//    @Bean
//    DataSource dataSource() {
//        return new SimpleDriverDataSource() {
//            {
//                setDriverClass(org.postgresql.Driver.class);
//                setUsername("postgres");
//                setUrl("jdbc:h2:mem");
//                setPassword("");
//            }
//        };
//    }
//
//    @Bean(name = "transactionManager")
//    public PlatformTransactionManager transactionManager() {
//        JpaTransactionManager tm =
//                new JpaTransactionManager();
//        tm.setEntityManagerFactory(emf);
//        tm.setDataSource(dataSource());
//        return tm;
//    }
//}