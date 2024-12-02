package com.fs.auth.component

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtils {

    @Value("\${jwt.secret}")
    private lateinit var secretKey: String

    private val jwtExpirationMs = 86400000 // 24 hours in milliseconds

    // Генерация JWT токена
    fun generateJwtToken(email: String): String {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(Date())
            .setExpiration(Date(Date().time + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, secretKey)
            .compact()
    }

    // Извлечение имени пользователя из токена
    fun getUserNameFromJwtToken(token: String): String {
        return Jwts.parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .body
            .subject
    }

    // Проверка валидности токена
    fun validateJwtToken(authToken: String): Boolean {
        return try {
            Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(authToken)
            true
        } catch (e: Exception) {
            false
        }
    }
}