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

    // Проверка соответствия пароля и его хеша
    fun verifyPassword(password: String, hashedPasswordWithSalt: Pair<String, String>): Boolean {
        val (hashedPassword, salt) = hashedPasswordWithSalt
        val generatedHash = BCrypt.hashpw(password, salt)
        return hashedPassword == generatedHash
    }


    // Хеширование пароля с солью
    fun encodePassword(rawPassword: String): Pair<String, String> {
        val salt = generateSalt()
        val hashedPassword = BCrypt.hashpw(rawPassword, salt)
        return Pair(hashedPassword, salt)
    }

    // Старая версия шифрования пароля
//    fun encodePassword(rawPassword: String): String {
//        return BCryptPasswordEncoder().encode(rawPassword)
//    }
}