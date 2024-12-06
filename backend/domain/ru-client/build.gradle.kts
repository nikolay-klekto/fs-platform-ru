import io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension
import nu.studer.gradle.jooq.JooqEdition
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jooq.meta.jaxb.ForcedType

plugins {
    kotlin("plugin.spring") version "1.8.21"
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.0.14.RELEASE"
    id("nu.studer.jooq") version "7.1.1"
}

the<DependencyManagementExtension>().apply {
    imports {
        mavenBom(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES)
    }
}

val mainClassPath = "com.fs.client.ClientServiceAppKt"

tasks.getByName<Jar>("jar") {
    enabled = true
    archiveClassifier.set("lib") // Указываем, что это библиотечный JAR
}

tasks.getByName<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    enabled = true
    archiveClassifier.set("")
    archiveBaseName.set("ru-client")
    archiveVersion.set("0.0.2-SNAPSHOT")// Основной JAR будет исполняемым
}

group = "com.fs.platform.ru"
version = "0.0.2-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":backend:domain:ru-client-model"))
    implementation(project(":backend:domain:ru-service-model"))

    // GraphQL
    implementation("org.springframework.boot:spring-boot-starter-graphql")
    implementation("com.graphql-java:graphql-java-extended-scalars:20.0")
//    implementation("com.tailrocks.graphql:graphql-datetime-spring-boot-starter:6.0.0")

    // Spring Boot Starters
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework:spring-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-jooq")

    // Jackson
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // Kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // SpringDoc OpenAPI
    implementation("org.springdoc:springdoc-openapi-webmvc-core:1.6.12")
    implementation("org.springdoc:springdoc-openapi-kotlin:1.6.12")

    // Logging
    implementation("org.apache.logging.log4j:log4j-api:2.23.1")
    implementation("org.apache.logging.log4j:log4j-core:2.23.1")

    // PostgreSQL
    runtimeOnly("org.postgresql:postgresql:42.5.0")

    // Micrometer
    implementation("io.micrometer:micrometer-core:1.13.2")
    implementation("io.micrometer:micrometer-registry-prometheus:1.13.2")

    // JWT
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")

    // Spring Boot Devtools
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // JOOQ
    implementation("org.jooq:jooq:3.17.4")
    jooqGenerator("org.jooq:jooq:3.17.4")
    jooqGenerator("org.postgresql:postgresql:42.5.0")
    jooqGenerator("jakarta.xml.bind:jakarta.xml.bind-api:4.0.0")

    // Google API
    implementation("com.google.api-client:google-api-client:2.2.0")
    implementation("com.google.apis:google-api-services-calendar:v3-rev411-1.25.0")
    implementation("com.google.oauth-client:google-oauth-client-jetty:1.35.0")

    // Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.graphql:spring-graphql-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(17)
}

jooq {
    version.set("3.17.4")
    edition.set(JooqEdition.OSS)

    configurations {
        create("main") {
            jooqConfiguration.apply {
                jdbc.apply {
                    driver = "org.postgresql.Driver"
                    url = "jdbc:postgresql://45.135.234.61:15432/fun_scrut"
                    user = "username"
                    password = "password"
                }
                generator.apply {
                    name = "org.jooq.codegen.KotlinGenerator"
                    database.apply {
                        name = "org.jooq.meta.postgres.PostgresDatabase"
                        inputSchema = "public"
                        forcedTypes = listOf(
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.client.ru.enums.ClientRoleModel"
                                includeExpression = ".*client.role"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.client.ru.enums.EducationModel"
                                includeExpression = ".*education_status.*"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.client.ru.enums.EmploymentModel"
                                includeExpression = ".*client.employment"
                                includeTypes = ".*"
                            }
                        )
                    }
                    generate.apply {
                        isDeprecated = false
                        isRecords = true
                        isImmutablePojos = false
                        isFluentSetters = true
                        isPojos = true
                        withSequences(false)
                    }
                    target.apply {
                        packageName = "com.fs.domain.jooq"
                        directory = "src/generated/jooq"
                    }
                    strategy.name = "org.jooq.codegen.DefaultGeneratorStrategy"
                }
            }
        }
    }
}
