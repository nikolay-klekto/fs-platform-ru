package com.fs.client.service

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
open class PasswordService {

    fun encodePassword(rawPassword: String): String {
        return BCryptPasswordEncoder().encode(rawPassword)
    }
}