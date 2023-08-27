package com.fs.ru.registration.service

import com.fs.ru.registration.jpa.User
import org.springframework.security.core.userdetails.UserDetailsService

interface UserDetailsService : UserDetailsService {

    fun createVerificationTokenForUser(token: String, user: User)

    fun validateVerificationToken(token: String): String
}