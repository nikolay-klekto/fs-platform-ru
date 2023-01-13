package com.fs.ru.registration.service

import com.fs.ru.registration.jpa.User
import com.fs.ru.registration.jpa.VerificationToken
import com.fs.ru.registration.repository.UserRepository
import com.fs.ru.registration.repository.VerificationTokenRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*
import java.util.stream.Collectors

@Service
class UserDetailsServiceImpl : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var tokenRepository: VerificationTokenRepository

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username).get()

        val authorities: List<GrantedAuthority> =
            user.roles!!.stream().map({ role -> SimpleGrantedAuthority(role.name) })
                .collect(Collectors.toList<GrantedAuthority>())

        return org.springframework.security.core.userdetails.User
            .withUsername(username)
            .password(user.password)
            .authorities(authorities)
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build()
    }

    override fun createVerificationTokenForUser(token: String, user: User) {
        tokenRepository.save(VerificationToken(token, user))
    }

    override fun validateVerificationToken(token: String): String {
        val verificationToken: Optional<VerificationToken> = tokenRepository.findByToken(token)

        if (verificationToken.isPresent) {
            val user: User = verificationToken.get().user
            val cal: Calendar = Calendar.getInstance()
            if ((verificationToken.get().expiryDate.time - cal.time.time) <= 0) {
                tokenRepository.delete(verificationToken.get())
                return TOKEN_EXPIRED
            }

            user.enabled = true
            tokenRepository.delete(verificationToken.get())
            userRepository.save(user)
            return TOKEN_VALID
        } else {
            return TOKEN_INVALID
        }

    }

    companion object {
        val TOKEN_VALID: String = "valid"
        val TOKEN_INVALID: String = "invalid"
        val TOKEN_EXPIRED: String = "expired"
    }
}