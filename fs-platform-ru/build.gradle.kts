import org.gradle.internal.impldep.org.fusesource.jansi.AnsiRenderer.test

plugins {
    `java`
    `java-library`
    kotlin("jvm") version "1.3.61" apply false

}
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(11))
    }
}

//group  = 'org.example'
//version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    api("junit:junit:4.13")
    implementation("junit:junit:4.13")
    testImplementation("junit:junit:4.13")
}

subprojects {
    apply( plugin = "org.jetbrains.kotlin.jvm")

    repositories {
        mavenCentral()
    }
}





//buildscript {
//
//
//    repositories {
//        mavenCentral()
//        jcenter()
//    }
//
////    dependencies {
////        classpath("org.springframework.boot:spring-boot-gradle-plugin:6.0")
////    }
//}
//
//allprojects {
//    group 'com.gradle.project'
//    version '1.0-SNAPSHOT'
//}
//
//subprojects {
//    apply plugin: 'java'
//    apply plugin: 'idea'
//    apply plugin: "io.spring.dependency-management"
//
//    sourceCompatibility = 1.8
//    targetCompatibility = 1.8
//
//    repositories {
//        mavenLocal()
//        mavenCentral()
//        jcenter()
//    }
//
//    dependencies{
//        // Если здесь настроена зависимость пакета jar, все подпроекты являются общими, и используется функция переноса зависимостей gradle.
//        testCompile group: 'junit', name: 'junit', version: '4.12'
//    }
//}


//plugins {
//    id("java")
//}
//
//group = "com.example"
//version = "1.0"
//
//repositories {
//    mavenCentral()
//}
//
//dependencies {
//    implementation(project("gateway:registration:registration-auth"))
//    testImplementation("junit:junit:4.13")
//}


//buildscript {
//    apply from: "${rootDir}/_gradle/versions.gradle"
//
//    dependencies {
//        classpath lib("org.jetbrains.kotlin:kotlin-gradle-plugin")
//        classpath lib("com.gradle.publish:plugin-publish-plugin")
//        classpath lib("com.apollographql.apollo:apollo-gradle-plugin")
//        classpath lib("io.gitlab.arturbosch.detekt:detekt-gradle-plugin")
//    }
//}
//
////plugins {
////    kotlin("jvm") version "1.7.21"
////    application
////}
//
//plugins {
//    id 'java-library'
//    id 'maven-publish'
//    id 'idea'
//    id "jacoco"
//    id "org.sonarqube" version "3.3"
//    id "ca.cutterslade.analyze" version "1.6.0" apply true
//
//group = "com.fs.platform.ru"
//version = "${currentVersion}"
//
//    idea {
//        project {
//            jdkName = '1.8'
//            languageLevel = '1.8'
//        }
//        module {
//            name = "mm-platform-run"
//        }
//    }
//
//repositories {
//    mavenCentral()
//}
//
//
//tasks.test {
//    useJUnitPlatform()
//}
//
//tasks.withType<KotlinCompile> {
//    kotlinOptions.jvmTarget = "1.8"
//}
//
//application {
//    mainClass.set("MainKt")
//}