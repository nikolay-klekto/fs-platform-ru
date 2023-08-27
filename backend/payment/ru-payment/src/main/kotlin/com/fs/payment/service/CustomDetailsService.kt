package com.fs.payment.service

import com.fs.payment.model.CustomUser
import com.fs.payment.model.UserEntity
import com.fs.payment.repository.OAuthDao
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class CustomDetailsService : UserDetailsService {
    @Autowired
    var oauthDao: OAuthDao? = null

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): CustomUser {
        var userEntity: UserEntity? = null
        return try {
            userEntity = oauthDao!!.getUserDetails(username)
            CustomUser(userEntity!!)
        } catch (e: Exception) {
            e.printStackTrace()
            throw UsernameNotFoundException("User $username was not found in the database")
        }
    }
}