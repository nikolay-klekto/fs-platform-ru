package com.fs.client.ru

data class AuthorizationClientModel(
    var basketId: Long?,
    val email: String?,
    val password: String?,
    val phoneNumber: String?
    )