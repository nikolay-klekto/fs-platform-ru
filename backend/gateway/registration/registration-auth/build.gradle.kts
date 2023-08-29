//
//plugins {
//    id("org.springframework.boot") version "3.0.2"
//    id("io.spring.dependency-management") version "1.1.0"
//    id("org.jetbrains.kotlin.plugin.spring") version "1.8.21"
//    id("org.jetbrains.kotlin.plugin.jpa") version "1.8.21"
//}
//
//
////
//dependencies {
//    implementation("org.springframework.boot:spring-boot-gradle-plugin:3.0.2")
//
//    implementation("org.springframework.boot:spring-boot-starter-actuator:3.0.2")
//    implementation("org.springframework.boot:spring-boot-starter-web:3.0.2")
//    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.0.2")
//    implementation("org.springframework.boot:spring-boot-starter-mail:3.0.2")
//    implementation("org.springframework.boot:spring-boot-starter-security:3.0.2")
//    implementation("org.springframework.boot:spring-boot-devtools:3.0.2")
//    implementation("jakarta.validation:jakarta.validation-api:3.0.2")
//    compileOnly("com.guicedee.services:jakarta.servlet-api:1.2.2.1")
//    implementation("org.postgresql:postgresql:42.5.1")
//    implementation("org.springframework.boot:spring-boot-starter-thymeleaf:3.0.2")
//    implementation("commons-io:commons-io:2.11.0")
//    implementation("io.jsonwebtoken:jjwt:0.9.0")
//    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
//    implementation("com.mashape.unirest:unirest-java:1.4.9")
//    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.14.1")
//    implementation("org.springframework.boot:spring-boot-devtools:3.0.2")
//    testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.2")
//    implementation("org.hibernate.validator:hibernate-validator:8.0.0.Final")
//
//    testImplementation("org.springframework.boot:spring-boot-starter-test:3.0.2") {
//        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
//    }
//}

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.7.4"
    id("io.spring.dependency-management") version "1.0.14.RELEASE"
//    kotlin("jvm") version "1.3.50"
//    kotlin("jvm") version "1.8.21"
//    kotlin("plugin.spring") version "1.3.50"
    kotlin("plugin.spring") version "1.8.21"
//    id("org.jetbrains.kotlin.plugin.jpa") version "1.3.50"
    id("org.jetbrains.kotlin.plugin.jpa") version "1.8.21"
}

group = "com.kotlin-spring-vue"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
    maven {
        url = uri("https://plugins.gradle.org/m2/")
    }
}

dependencies {
    runtimeOnly(project(":frontend"))
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.postgresql:postgresql:42.2.5")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("commons-io:commons-io:2.4")
    implementation("io.jsonwebtoken:jjwt:0.9.0")
    implementation("io.jsonwebtoken:jjwt-api:0.10.6")
    implementation("com.mashape.unirest:unirest-java:1.4.9")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.8")
    runtimeOnly("org.springframework.boot:spring-boot-devtools")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
//    implementation("org.jetbrains.kotlin:kotlin-noarg:1.3.50")
//    implementation("org.jetbrains.kotlin:kotlin-noarg:1.8.21")
    implementation("jakarta.validation:jakarta.validation-api:2.0.2")


    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}


