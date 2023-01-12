import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val kotlin_version: String by extra
buildscript {
    var kotlin_version: String by extra
    kotlin_version = "1.8.0"
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath(kotlin("gradle-plugin", kotlin_version))
    }
}


dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web:3.0.1")
    implementation("org.springframework.boot:spring-boot-starter-mail:3.0.1")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf:3.0.1")
    implementation("org.springframework.boot:spring-boot-starter-validation:3.0.1")
    implementation("org.jboss.aerogear:aerogear-otp-java:1.0.0")
    implementation("org.springframework.boot:spring-boot-starter-security:3.0.1")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity5:3.1.1.RELEASE")
    implementation("javax.servlet:jstl:1.2")
    implementation("org.passay:passay:1.0")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.0.1")
    implementation("org.postgresql:postgresql:42.5.1")
    implementation("com.google.guava:guava:31.1-jre")
    implementation("com.github.ua-parser:uap-java:1.5.3")
    implementation("com.maxmind.geoip2:geoip2:4.0.0")
    testImplementation("io.rest-assured:rest-assured:5.3.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test:3.0.1")
    testImplementation("org.junit.platform:junit-platform-runner:1.9.1")
    implementation("net.logstash.logback:logstash-logback-encoder:7.2")
    implementation("org.springframework.boot:spring-boot-configuration-processor:3.0.1")
    implementation("nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect:3.1.0")
    compileOnly("javax.servlet:javax.servlet-api:4.0.1")
    implementation("javax.validation:validation-api:2.0.1.Final")
    implementation("javax.persistence:javax.persistence-api:2.2")
    implementation("javax.transaction:javax.transaction-api:1.3")
    implementation(kotlin("stdlib-jdk8", kotlin_version))


}


//apply plugin: 'org.springframework.boot
//dependencies {
//    compile project (:gateway:registration:registration-auth)
//    compile('org.springframework.boot:spring-boot-starter')
//    compile('org.springframework.boot:spring-boot-starter-actuator')
//    compile('org.springframework.boot:spring-boot-starter-web')
//}

//plugins {
//    id("fs-platform-ru")
//}

//dependencies {
//    implementation(project(":shared"))
//}
apply {
    plugin("kotlin")
}
repositories {
    mavenCentral()
}
val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
    jvmTarget = "1.8"
}
val compileTestKotlin: KotlinCompile by tasks
compileTestKotlin.kotlinOptions {
    jvmTarget = "1.8"
}