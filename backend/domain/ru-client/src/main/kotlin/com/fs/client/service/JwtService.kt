package com.fs.client.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.security.SignatureException

@Service
class JwtService {

    @Value("\${jwt.secret}")
    private lateinit var secretKey: String

    fun validateToken(token: String): Claims? {
        return try {
            val parsedClaims = Jwts.parser()
                .setSigningKey(secretKey.toByteArray())
                .parseClaimsJws(token)
                .body
            println("Parsed Claims: $parsedClaims")
            parsedClaims
        } catch (e: ExpiredJwtException) {
            println("Token expired: ${e.message}")
            throw IllegalArgumentException("Token expired")
        } catch (e: SignatureException) {
            println("Invalid token signature: ${e.message}")
            throw IllegalArgumentException("Invalid token signature")
        } catch (e: Exception) {
            println("Error validating token: ${e.message}")
            null
        }
    }
}