package com.fs.payment.model

import org.springframework.security.core.GrantedAuthority


data class UserEntity (
    var username: String? = null,
    var password: String? = null,
    var grantedAuthoritiesList: Collection<GrantedAuthority> = ArrayList()
)