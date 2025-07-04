package com.fs.client.ru

data class AuthResponse(
    val accessToken: String,
    val refreshToken: String,
    val clientId: String
)