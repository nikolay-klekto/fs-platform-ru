package com.fs.auth.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.SignatureException
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*

@Service
class JwtService {

    @Value("\${jwt.secret}")
    private lateinit var secretKey: String

    fun generateAccessToken(clientId: String, durationInMinutes: Long): String {
        val claims = mapOf(
            "clientId" to clientId,
            "tokenType" to "access" // Указываем тип токена
        )
        return generateToken(claims, durationInMinutes)
    }

    fun generateRefreshToken(clientId: String, durationInDays: Long): String {
        val claims = mapOf(
            "clientId" to clientId,
            "tokenType" to "refresh" // Указываем тип токена
        )
        return generateToken(claims, durationInDays * 24 * 60)
    }

    private fun generateToken(claims: Map<String, Any>, durationInMinutes: Long): String {
        println(claims.toString())
        val builder = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + durationInMinutes * 60 * 1000))
            .signWith(SignatureAlgorithm.HS512, secretKey.toByteArray())

        val compactToken = builder.compact()
        println("Generated Token: $compactToken")
        return compactToken
    }

    fun validateToken(token: String): Claims? {
        return try {
            Jwts.parser()
                .setSigningKey(secretKey.toByteArray())
                .parseClaimsJws(token)
                .body
        } catch (e: ExpiredJwtException) {
            throw IllegalArgumentException("Token expired")
        } catch (e: SignatureException) {
            throw IllegalArgumentException("Invalid token signature")
        } catch (e: Exception) {
            null
        }
    }
}
