package com.fs.ru.registration.web.response

import org.springframework.security.core.GrantedAuthority

class SuccessfulSigninResponse(var username: String?, val authorities: Collection<GrantedAuthority>) {

}