
plugins {
    id("org.springframework.boot") version "2.1.3.RELEASE"
    id("io.spring.dependency-management") version "1.0.8.RELEASE"
    id("org.jetbrains.kotlin.plugin.spring")
    id("org.jetbrains.kotlin.plugin.jpa") version "1.3.50"
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator:2.1.3.RELEASE")
    implementation("org.springframework.boot:spring-boot-starter-web:2.1.3.RELEASE")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.1.3.RELEASE")
    implementation("org.springframework.boot:spring-boot-starter-mail:2.1.3.RELEASE")
    implementation("org.springframework.boot:spring-boot-starter-security:2.1.3.RELEASE")
    implementation("org.postgresql:postgresql:42.2.5")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf:2.1.3.RELEASE")
    implementation("commons-io:commons-io:2.4")
    implementation("io.jsonwebtoken:jjwt:0.9.0")
    implementation("io.jsonwebtoken:jjwt-api:0.10.6")
    implementation("com.mashape.unirest:unirest-java:1.4.9")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.8")
    runtimeOnly("org.springframework.boot:spring-boot-devtools:2.1.3.RELEASE")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
}

