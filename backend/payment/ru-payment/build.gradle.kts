
plugins {
    kotlin("plugin.spring") version "1.8.21"
    application
    id("java")
    id("org.springframework.boot") version "2.7.4"
    id("eclipse")

}

group = "com.fs.payment.ru"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-security:3.1.1")
    compileOnly("org.springframework.boot:spring-boot-starter-web:3.1.1")
    testCompileOnly("org.springframework.boot:spring-boot-starter-test:3.1.1")
    testCompileOnly("org.springframework.security:spring-security-test:6.1.1")
    compileOnly("org.springframework.security.oauth:spring-security-oauth2:2.5.2.RELEASE")
    compileOnly("org.springframework.security:spring-security-jwt:1.1.1.RELEASE")
    compileOnly("org.springframework.boot:spring-boot-starter-jdbc:3.1.1")
    compileOnly("com.h2database:h2:1.4.191")
}
