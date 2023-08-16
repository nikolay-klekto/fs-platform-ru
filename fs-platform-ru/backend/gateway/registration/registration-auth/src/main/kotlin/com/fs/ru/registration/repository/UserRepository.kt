package com.fs.ru.registration.repository

//import com.fs.ru.registration.jpa.User
//import jakarta.transaction.Transactional
//import org.springframework.data.jpa.repository.JpaRepository
//import org.springframework.data.repository.CrudRepository
//import org.springframework.data.repository.query.Param
//import java.util.*
//
//interface UserRepository : CrudRepository<User, Long> {
//
//    fun existsByUsername(@Param("username") username: String): Boolean
//
//    fun findByUsername(@Param("username") username: String): Optional<User>
//
//    fun findByEmail(@Param("email") email: String): Optional<User>
//
//    @Transactional
//    fun deleteByUsername(@Param("username") username: String)
//
//}

import com.fs.ru.registration.jpa.User
import java.util.Optional
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.jpa.repository.JpaRepository
import javax.transaction.Transactional

interface UserRepository: JpaRepository<User, Long> {

    fun existsByUsername(@Param("username") username: String): Boolean

    fun findByUsername(@Param("username") username: String): Optional<User>

    @Transactional
    fun deleteByUsername(@Param("username") username: String)

}