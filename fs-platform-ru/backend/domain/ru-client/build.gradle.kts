import nu.studer.gradle.jooq.JooqEdition
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jooq.meta.jaxb.ForcedType
import org.jooq.meta.jaxb.Logging
import org.jooq.meta.jaxb.Property

plugins {
    id("java")
    id("org.springframework.boot") version "2.7.4"
    id("io.spring.dependency-management") version "1.0.14.RELEASE"
    id("nu.studer.jooq") version "7.1.1"
}

group = "com.fs.platform.ru"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":backend:domain:ru-client-model"))
    implementation(project(":backend:domain:ru-service-model"))

    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-graphql")
    implementation("org.springframework.boot:spring-boot-starter-jooq")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.springdoc:springdoc-openapi-webmvc-core:1.6.12")
    implementation("org.springdoc:springdoc-openapi-kotlin:1.6.12")
    implementation("org.jooq:jooq-kotlin:3.17.4")
    implementation("com.tailrocks.graphql:graphql-datetime-spring-boot-starter:6.0.0")
    implementation("com.graphql-java:graphql-java-extended-scalars:2023-01-24T02-11-56-babda5f")
//    implementation("org.springframework.cloud:spring-cloud-starter-consul-discovery:4.0.1")
    implementation("log4j:log4j:1.2.17")




    developmentOnly("org.springframework.boot:spring-boot-devtools")

    runtimeOnly("org.postgresql:postgresql")

    jooqGenerator("org.postgresql:postgresql:42.5.0")
    jooqGenerator("jakarta.xml.bind:jakarta.xml.bind-api:4.0.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework:spring-webflux")
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

//kotlin.sourceSets.create("src/generated/jooq")

jooq {
    version.set("3.16.7")
    edition.set(JooqEdition.OSS)

    configurations {
        create("main") {
            jooqConfiguration.apply {
                logging = Logging.WARN
                jdbc.apply {
                    driver = "org.postgresql.Driver"
                    url = "jdbc:postgresql://localhost:5432/FunScrut2"
                    user = "postgres"
                    password = "191220#destin"
                    properties = listOf(
                        Property().apply {
                            key = "PAGE_SIZE"
                            value = "2048"
                        }
                    )
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
                                includeExpression = ".*client.education_status"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.client.ru.enums.EmploymentModel"
                                includeExpression = ".*client.employment"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.client.ru.enums.CurrencyModel"
                                includeExpression = ".*country.currency"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.client.ru.enums.CountryNameModel"
                                includeExpression = ".*country.name"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.service.ru.enums.IndustryModel"
                                includeExpression = ".*company.company_industry"
                                includeTypes = ".*"
                            },
                            ForcedType().apply {
                                isEnumConverter = true
                                userType = "com.fs.service.ru.enums.CompanyLegalCapacityStatus"
                                includeExpression = ".*company.legal_capacity_status"
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
                        withSequences(true)
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
