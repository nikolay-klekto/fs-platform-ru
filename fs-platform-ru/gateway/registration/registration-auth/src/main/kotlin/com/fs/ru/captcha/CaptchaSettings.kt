package com.fs.ru.captcha

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "google.recaptcha.key")
class CaptchaSettings {
    var site: String? = null
    var secret: String? = null

    //reCAPTCHA V3
    var siteV3: String? = null
    var secretV3: String? = null
    var threshold = 0f
}