package com.fs.client.component

import com.fasterxml.jackson.databind.ObjectMapper
import com.fs.client.service.JwtService
import jakarta.servlet.*
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.io.BufferedReader
import java.io.ByteArrayInputStream
import java.io.InputStreamReader
import java.io.StringWriter
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val publicQueries: Set<String>
) : Filter {

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
//        val publicQueries = listOf("getAllEvents")
        val httpRequest = request as HttpServletRequest
        val httpResponse = response as HttpServletResponse

        if (httpRequest.requestURI.startsWith("/actuator")) {
            chain.doFilter(request, response)
            return
        }

        val cachedBody = cacheRequestBody(httpRequest)
        val wrappedRequest = ResettableStreamHttpServletRequest(httpRequest, cachedBody)

        println("JwtAuthenticationFilter: Received request")
        println("JwtAuthenticationFilter: Method = ${wrappedRequest.method}, URI = ${wrappedRequest.requestURI}")

        val requestBody = cachedBody.takeIf { it.isNotBlank() } ?: run {
            println("JwtAuthenticationFilter: Empty request body, skipping processing")
            chain.doFilter(wrappedRequest, httpResponse)
            return
        }

        println("JwtAuthenticationFilter: Full Request Body: $requestBody")

        val fieldName = extractFieldNameFromQuery(requestBody)
        println("JwtAuthenticationFilter: Extracted fieldName = $fieldName")

        // Обрабатываем запросы интроспекции
        if (fieldName == "__schema" || fieldName == "__type") {
            println("JwtAuthenticationFilter: Introspection query, skipping auth")
            chain.doFilter(wrappedRequest, httpResponse)
            return
        }

        if (fieldName == null || publicQueries.contains(fieldName)) {
            println("JwtAuthenticationFilter: Public query, skipping auth")
            chain.doFilter(wrappedRequest, httpResponse)
            return
        }

        val token = wrappedRequest.getHeader("Authorization")?.removePrefix("Bearer ")
        val clientId = validateTokenAndExtractClientId(token, httpResponse)

        // Если токен невалидный или refresh-токен уже завершил обработку
        if (clientId == null) {
            println("JwtAuthenticationFilter: Token validation failed, response already handled")
            return
        }

        wrappedRequest.setAttribute("clientId", clientId)
        chain.doFilter(wrappedRequest, httpResponse)
    }



    private fun cacheRequestBody(request: HttpServletRequest): String {
        val stringWriter = StringWriter()
        request.reader.use { reader ->
            reader.copyTo(stringWriter)
        }
        return stringWriter.toString()
    }

//    private fun validateTokenAndExtractClientId(token: String?, httpResponse: HttpServletResponse): String? {
//        if (token == null) return null
//        val claims = jwtService.validateToken(token) ?: return null
//        return claims["clientId"] as? String
//    }

    private fun validateTokenAndExtractClientId(token: String?, httpResponse: HttpServletResponse): String? {
        if (token == null) {
            println("JwtAuthenticationFilter: No Authorization header")
            if (!httpResponse.isCommitted) {
                httpResponse.status = HttpServletResponse.SC_UNAUTHORIZED
                httpResponse.writer.write("Unauthorized: Missing or invalid token")
            }
            return null
        }

        val claims = try {
            jwtService.validateToken(token)
        } catch (e: IllegalArgumentException) {
            // Ловим исключения из validateToken
            println("JwtAuthenticationFilter: Token validation error - ${e.message}")
            if (!httpResponse.isCommitted) {
                httpResponse.status = HttpServletResponse.SC_UNAUTHORIZED
                httpResponse.writer.write("Unauthorized: ${e.message}")
            }
            return null
        }

        if (claims == null) {
            println("JwtAuthenticationFilter: Invalid token")
            if (!httpResponse.isCommitted) {
                httpResponse.status = HttpServletResponse.SC_UNAUTHORIZED
                httpResponse.writer.write("Unauthorized: Missing or invalid token")
            }
            return null
        }

        val tokenType = claims["tokenType"] as? String
        if (tokenType == "refresh") {
            println("JwtAuthenticationFilter: Refresh token detected, unauthorized for this request")
            if (!httpResponse.isCommitted) {
                httpResponse.status = HttpServletResponse.SC_FORBIDDEN
                httpResponse.writer.write("Unauthorized: Refresh token cannot be used for this endpoint")
            }
            return null
        }

        val clientId = claims["clientId"] as? String
        println("JwtAuthenticationFilter: Retrieved clientId = $clientId")
        return clientId
    }



    private fun extractFieldNameFromQuery(query: String): String? {
        return try {
            val objectMapper = ObjectMapper()
            val rootNode = objectMapper.readTree(query)
            val queryText = rootNode.get("query")?.asText() ?: return null

            // Регулярное выражение для поиска первого метода в запросе
            val regex = Regex("""(?:query|mutation)\s*\{\s*(\w+)""")
            regex.find(queryText)?.groupValues?.get(1)
        } catch (e: Exception) {
            println("JwtAuthenticationFilter: Error extracting field name: ${e.message}")
            null
        }
    }
}

class ResettableStreamHttpServletRequest(
    private val originalRequest: HttpServletRequest,
    private val cachedBody: String
) : HttpServletRequest by originalRequest {

    override fun getInputStream(): ServletInputStream {
        val byteArrayInputStream = ByteArrayInputStream(cachedBody.toByteArray())
        return object : ServletInputStream() {
            override fun read(): Int = byteArrayInputStream.read()
            override fun isFinished(): Boolean = byteArrayInputStream.available() == 0
            override fun isReady(): Boolean = true
            override fun setReadListener(listener: jakarta.servlet.ReadListener?) {}
        }
    }

    override fun getReader(): BufferedReader {
        val byteArrayInputStream = ByteArrayInputStream(cachedBody.toByteArray())
        return BufferedReader(InputStreamReader(byteArrayInputStream))
    }
}
