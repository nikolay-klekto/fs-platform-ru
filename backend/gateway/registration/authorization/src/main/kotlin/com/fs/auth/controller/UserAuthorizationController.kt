package com.fs.auth.controller

import com.fs.auth.jooq.tables.pojos.ClientsRefreshTokens
import com.fs.auth.repository.UserRepository
import com.fs.auth.repository.blocked.OrderBlockingRepository
import com.fs.auth.repository.blocked.RefreshTokenBlockingRepository
import com.fs.auth.service.JwtService
import com.fs.client.ru.AuthResponse
import com.fs.client.ru.AuthorizationClientModel
import com.fs.service.ru.errors.ErrorModel
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
@RequestMapping("/auth")
class UserAuthorizationController(
private val userRepository: UserRepository,
private val jwtService: JwtService,
private val refreshTokenBlockingRepository: RefreshTokenBlockingRepository,
    private val orderBlockingRepository: OrderBlockingRepository
) {


    @MutationMapping
    fun register(@Argument client: AuthorizationClientModel): ErrorModel<AuthResponse> {
        try{


        val userId = userRepository.insert(client)

        // Генерация токенов
        val accessToken = jwtService.generateAccessToken(userId, 10)
        val refreshToken = jwtService.generateRefreshToken(userId, 30)
        refreshTokenBlockingRepository.insertToken(
            ClientsRefreshTokens(
                clientId = userId,
                token = refreshToken,
                expiryDay = LocalDate.now().plusDays(30) // 30 дней
            )
        )

        return ErrorModel(AuthResponse(
            accessToken = accessToken,
            refreshToken = refreshToken,
            clientId = userId
        ), null)

        } catch (e: Exception) {
            // Логируем ошибку
            println("Исключение в контроллере: ${e.message}") // Для проверки
            return ErrorModel(null, e.message) // Повторно выбрасываем исключение, чтобы оно дошло до обработчика
        }
    }

    @MutationMapping
    fun login(@Argument client: AuthorizationClientModel): ErrorModel<AuthResponse> {
        try {

        // Проверка логина и пароля
        val user = userRepository.verifyPassword(client)

        if (client.basketId != null) {
            orderBlockingRepository.copyAllOrdersToMainBasket(client.basketId!!, user.basketId!!)
        }
        // Генерация токенов
        val accessToken = jwtService.generateAccessToken(user.id!!, 10)
        val refreshToken = jwtService.generateRefreshToken(user.id!!, 30)
        refreshTokenBlockingRepository.insertToken(
            ClientsRefreshTokens(
                clientId = user.id,
                token = refreshToken,
                expiryDay = LocalDate.now().plusDays(30) // 30 дней
            )
        )

        return ErrorModel(AuthResponse(
            accessToken = accessToken,
            refreshToken = refreshToken,
            clientId = user.id!!
        ), null)

        } catch (e: Exception) {
            // Логируем ошибку
            println("Исключение в контроллере: ${e.message}") // Для проверки
            return ErrorModel(null, e.message) // Повторно выбрасываем исключение, чтобы оно дошло до обработчика
        }
    }

    @MutationMapping
    fun refreshToken(@Argument refreshToken: String): ErrorModel<AuthResponse> {
        try {

        // Проверяем наличие токена в базе
        val tokenEntity = refreshTokenBlockingRepository.findByToken(refreshToken)
            ?: throw IllegalArgumentException("Invalid refresh token")


            // Проверяем, не истек ли токен
            if (tokenEntity.expiryDay!!.isBefore(LocalDate.now())) {
                throw IllegalArgumentException("Refresh token expired")
            }

            // Генерируем новый accessToken
            val newAccessToken = jwtService.generateAccessToken(tokenEntity.clientId!!, 10)

            // Опционально: создаем новый refreshToken и удаляем старый
            val newRefreshToken = jwtService.generateRefreshToken(tokenEntity.clientId!!, 30)
        refreshTokenBlockingRepository.deleteByToken(refreshToken)
        refreshTokenBlockingRepository.insertToken(
            ClientsRefreshTokens(
                    clientId = tokenEntity.clientId,
                    token = newRefreshToken,
                    expiryDay = LocalDate.now().plusDays(30) // 30 дней
                )
            )

            // Возвращаем новые токены
            return ErrorModel(AuthResponse(
                accessToken = newAccessToken,
                refreshToken = newRefreshToken,
                clientId = tokenEntity.clientId!!
            ), null)
        } catch (e: Exception) {
            // Логируем ошибку
            println("Исключение в контроллере: ${e.message}") // Для проверки
            return ErrorModel(null, e.message) // Повторно выбрасываем исключение, чтобы оно дошло до обработчика
        }
        }

    @MutationMapping
    fun logout(@Argument refreshToken: String): Boolean {
        return refreshTokenBlockingRepository.deleteByToken(refreshToken)
    }

}
