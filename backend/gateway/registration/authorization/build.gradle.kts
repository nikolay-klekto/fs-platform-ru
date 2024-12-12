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


val mainClassPath = "com.fs.auth.AuthServiceAppKt"

tasks.getByName<Jar>("jar") {
    enabled = false
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    dependsOn(":backend:domain:ru-client:bootJar")
    archiveBaseName.set("ru-auth")
    archiveVersion.set("0.0.3-SNAPSHOT")
}

group = "com.fs.platform.ru"
version = "0.0.3-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {


    implementation(project(":backend:domain:ru-client-model"))
    implementation(project(":backend:domain:ru-service-model"))
//    implementation(project(":backend:domain:ru-client")) {
//        artifact {
//            classifier = "lib" // Используем библиотечный JAR из ru-client
//        }
//    }
//    runtimeOnly(project(":frontend"))
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-graphql")
    implementation("org.springframework.boot:spring-boot-starter-jooq")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-tomcat")
//    implementation("org.springframework:spring-core")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jooq:jooq-kotlin:3.17.4")
    implementation(platform(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES))
    implementation("org.postgresql:postgresql:42.5.0")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("org.postgresql:postgresql")

//    jooqGenerator("org.postgresql:postgresql:42.5.0")
//    jooqGenerator("jakarta.xml.bind:jakarta.xml.bind-api:4.0.0")
    // JOOQ
    implementation("org.jooq:jooq:3.17.4")
    jooqGenerator("org.jooq:jooq:3.17.4")
    jooqGenerator("org.postgresql:postgresql:42.5.0")
    jooqGenerator("jakarta.xml.bind:jakarta.xml.bind-api:4.0.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
//    testImplementation("org.springframework:spring-webflux")
//    testImplementation("org.springframework.graphql:spring-graphql-test")

    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")
    implementation("com.github.f4b6a3:ulid-creator:5.2.0")

}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
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
                        includes = "basket|company_profession|order|clients_refresh_tokens|client"
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
                        packageName = "com.fs.auth.jooq"
                        directory = "src/generated/jooq"
                    }
                    strategy.name = "org.jooq.codegen.DefaultGeneratorStrategy"
                }
            }
        }
    }
}


