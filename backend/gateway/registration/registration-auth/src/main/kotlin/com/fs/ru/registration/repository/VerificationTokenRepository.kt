package com.fs.ru.registration.repository

//import com.fs.ru.registration.jpa.VerificationToken
//import org.springframework.data.jpa.repository.JpaRepository
//import org.springframework.data.repository.CrudRepository
//import java.util.*
//
//interface VerificationTokenRepository : CrudRepository<VerificationToken, Long> {
//    fun findByToken(token: String): Optional<VerificationToken>
//}

import com.fs.ru.registration.jpa.VerificationToken
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface VerificationTokenRepository : JpaRepository<VerificationToken, Long> {
    fun findByToken(token: String): Optional<VerificationToken>
}