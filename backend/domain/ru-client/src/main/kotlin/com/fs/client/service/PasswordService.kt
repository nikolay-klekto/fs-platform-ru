package com.fs.client.service

import org.mindrot.jbcrypt.BCrypt
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.security.SecureRandom

@Service
open class PasswordService {

    // Генерация случайной соли
    private fun generateSalt(): String {
        val random = SecureRandom()
        val saltBytes = ByteArray(16)
        random.nextBytes(saltBytes)
        return BCrypt.gensalt(12, random)
    }

    // Хеширование пароля с солью
    fun hashPassword(password: String): Pair<String, String> {
        val salt = generateSalt()
        val hashedPassword = BCrypt.hashpw(password, salt)
        return Pair(hashedPassword, salt)
    }

    // Проверка соответствия пароля и его хеша
    fun verifyPassword(password: String, hashedPasswordWithSalt: Pair<String, String>): Boolean {
        val (hashedPassword, salt) = hashedPasswordWithSalt
        val generatedHash = BCrypt.hashpw(password, salt)
        return hashedPassword == generatedHash
    }


    fun encodePassword(rawPassword: String): Pair<String, String> {
        return hashPassword(rawPassword)
    }

//    fun encodePassword(rawPassword: String): String {
//        return BCryptPasswordEncoder().encode(rawPassword)
//    }
}