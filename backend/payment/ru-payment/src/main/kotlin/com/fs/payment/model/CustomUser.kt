package com.fs.payment.model

import org.springframework.security.core.userdetails.User


class CustomUser(user: UserEntity) :
    User(user.username, user.password, user.grantedAuthoritiesList) {
    companion object {
        private const val serialVersionUID = 1L
    }
}