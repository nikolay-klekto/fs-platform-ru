package com.fs.ru.captcha

import com.baeldung.captcha.CaptchaSettings
import com.baeldung.captcha.ReCaptchaAttemptService
import com.baeldung.web.error.ReCaptchaInvalidException
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.util.StringUtils
import org.springframework.web.client.RestOperations
import java.util.regex.Pattern

abstract class AbstractCaptchaService : ICaptchaService {
    @Autowired
    protected var request: HttpServletRequest? = null

    @Autowired
    protected var captchaSettings: CaptchaSettings? = null

    @Autowired
    protected var reCaptchaAttemptService: ReCaptchaAttemptService? = null

    @Autowired
    protected var restTemplate: RestOperations? = null
    override fun getReCaptchaSite(): String {
        return captchaSettings!!.site
    }

    override fun getReCaptchaSecret(): String {
        return captchaSettings!!.secret
    }

    protected fun securityCheck(response: String?) {
        LOGGER.debug("Attempting to validate response {}", response)
        if (reCaptchaAttemptService!!.isBlocked(clientIP)) {
            throw ReCaptchaInvalidException("Client exceeded maximum number of failed attempts")
        }
        if (!responseSanityCheck(response)) {
            throw ReCaptchaInvalidException("Response contains invalid characters")
        }
    }

    protected fun responseSanityCheck(response: String?): Boolean {
        return StringUtils.hasLength(response) && RESPONSE_PATTERN.matcher(response).matches()
    }

    protected val clientIP: String
        get() {
            val xfHeader = request!!.getHeader("X-Forwarded-For") ?: return request!!.remoteAddr
            return xfHeader.split(",".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()[0]
        }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(AbstractCaptchaService::class.java)
        protected val RESPONSE_PATTERN = Pattern.compile("[A-Za-z0-9_-]+")
        public const val RECAPTCHA_URL_TEMPLATE =
            "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s&remoteip=%s"
    }
}