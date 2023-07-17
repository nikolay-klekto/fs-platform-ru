package com.fs.ru.registration.repository

//import com.fs.ru.registration.jpa.Role
//import org.springframework.data.jpa.repository.JpaRepository
//import org.springframework.data.repository.CrudRepository
//import org.springframework.data.repository.query.Param
//
//interface RoleRepository : CrudRepository<Role, Long> {
//
//    fun findByName(@Param("name") name: String): Role
//}

import com.fs.ru.registration.jpa.Role
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository : JpaRepository<Role, Long> {

    fun findByName(@Param("name") name: String): Role
}