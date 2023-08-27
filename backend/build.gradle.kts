import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.8.21"
    id("org.jetbrains.kotlin.plugin.spring") version "1.8.21"
}

group = "com.fs.platform.ru"
version = "0.0.1-SNAPSHOT"
//java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
    maven {
        url = uri("https://plugins.gradle.org/m2/")
    }
}

subprojects {
    apply(plugin = "org.jetbrains.kotlin.jvm")

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.0")
        runtimeOnly("org.jetbrains.kotlin:kotlin-reflect:1.8.0")
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0")
        implementation("org.jetbrains.kotlin:kotlin-noarg:1.8.0")
    }

    tasks.withType<KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "17"
        }
    }
}

kotlin { // Extension for easy setup
    jvmToolchain(8) // Target version of generated JVM bytecode. See 7️⃣
}

project("gateway:registration:registration-auth") {
//project("domain:ru-client") {

    dependencies {
        runtimeOnly(project(":frontend"))
    }
}


