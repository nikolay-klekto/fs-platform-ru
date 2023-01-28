package com.fs.ru.registration.jwt

import com.fs.ru.registration.service.UserDetailsServiceImpl
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException

class JwtAuthTokenFilter : OncePerRequestFilter() {

    @Value("\${ksvg.app.authCookieName}")
    lateinit var authCookieName: String

    @Autowired
    private val tokenProvider: JwtProvider? = null

    @Autowired
    private val userDetailsService: UserDetailsServiceImpl? = null

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {

            val jwt = getJwt(request)
            if (jwt != null && tokenProvider!!.validateJwtToken(jwt)) {
                val username = tokenProvider.getUserNameFromJwtToken(jwt)

                val userDetails = userDetailsService!!.loadUserByUsername(username)
                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                )
                authentication.setDetails(WebAuthenticationDetailsSource().buildDetails(request))

                SecurityContextHolder.getContext().setAuthentication(authentication)
            }
        } catch (e: Exception) {
            logger.error("Can NOT set user authentication -> Message: {}", e)
        }

        filterChain.doFilter(request, response)
    }

    private fun getJwt(request: HttpServletRequest): String? {
        try {
            for (cookie in request.cookies) {
                if (cookie.name == authCookieName) {
                    return cookie.value
                }
            }
        } catch (e: Exception) {
            println("No token found!")
        }
        return null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(JwtAuthTokenFilter::class.java)
    }
}