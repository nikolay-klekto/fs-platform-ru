package com.fs.ru.captcha

import com.baeldung.web.error.ReCaptchaInvalidException
import kotlin.Throws

interface ICaptchaService {
    @Throws(ReCaptchaInvalidException::class)
    fun processResponse(response: String?) {
    }

    @Throws(ReCaptchaInvalidException::class)
    fun processResponse(response: String?, action: String?) {
    }

    val reCaptchaSite: String?
    val reCaptchaSecret: String?
    fun getReCaptchaSite(): String
    fun getReCaptchaSecret(): String
}