package com.fs.client.service

import org.mindrot.jbcrypt.BCrypt
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.security.SecureRandom

@Service
open class PasswordService {

    object PasswordHashingUtil {
        // Генерация случайной соли
        private fun generateSalt(): String {
            val random = SecureRandom()
            val saltBytes = ByteArray(16)
            random.nextBytes(saltBytes)
            return BCrypt.gensalt(12, random)
        }

        // Хеширование пароля с солью
        fun hashPassword(password: String): String {
            val salt = generateSalt()
            return BCrypt.hashpw(password, salt)
        }
    }

    fun encodePassword(rawPassword: String): String {
        return PasswordHashingUtil.hashPassword(rawPassword)
    }

    // Проверка соответствия пароля и его хеша
    fun verifyPassword(password: String, hashedPassword: String): Boolean{
        return BCrypt.checkpw(password, hashedPassword)
    }

//    fun encodePassword(rawPassword: String): String {
//        return BCryptPasswordEncoder().encode(rawPassword)
//    }
}