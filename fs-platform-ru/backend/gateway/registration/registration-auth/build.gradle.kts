//
plugins {
    id("org.springframework.boot") version "3.0.2"
    id("io.spring.dependency-management") version "1.1.0"
    id("org.jetbrains.kotlin.plugin.spring") version "1.8.0"
    id("org.jetbrains.kotlin.plugin.jpa") version "1.8.0"
}
//
dependencies {
    implementation("org.springframework.boot:spring-boot-gradle-plugin:3.0.2")

    implementation("org.springframework.boot:spring-boot-starter-actuator:3.0.2")
    implementation("org.springframework.boot:spring-boot-starter-web:3.0.2")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.0.2")
    implementation("org.springframework.boot:spring-boot-starter-mail:3.0.2")
    implementation("org.springframework.boot:spring-boot-starter-security:3.0.2")
    implementation("org.springframework.boot:spring-boot-devtools:3.0.2")
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")
    compileOnly("javax.servlet:javax.servlet-api:4.0.1")
    implementation("org.postgresql:postgresql:42.5.1")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf:3.0.2")
    implementation("commons-io:commons-io:2.11.0")
    implementation("io.jsonwebtoken:jjwt:0.9.0")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("com.mashape.unirest:unirest-java:1.4.9")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.14.1")
    implementation("org.springframework.boot:spring-boot-devtools:3.0.2")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.2")
    implementation("org.hibernate.validator:hibernate-validator:8.0.0.Final")

    testImplementation("org.springframework.boot:spring-boot-starter-test:3.0.2") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
}

