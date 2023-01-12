package com.fs.ru.captcha

import com.baeldung.web.error.ReCaptchaInvalidException
import com.baeldung.web.error.ReCaptchaUnavailableException
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException
import java.net.URI
import kotlin.Throws

@Service("captchaServiceV3")
class CaptchaServiceV3 : AbstractCaptchaService() {
    @Throws(ReCaptchaInvalidException::class)
    override fun processResponse(response: String, action: String) {
        securityCheck(response)
        val verifyUri = URI.create(
            String.format(
                RECAPTCHA_URL_TEMPLATE,
                reCaptchaSecret, response, clientIP
            )
        )
        try {
            val googleResponse = restTemplate!!.getForObject(verifyUri, GoogleResponse::class.java)
            LOGGER.debug("Google's response: {} ", googleResponse.toString())
            if (!googleResponse.isSuccess || googleResponse.action != action || googleResponse.score < captchaSettings!!.threshold) {
                if (googleResponse.hasClientError()) {
                    reCaptchaAttemptService!!.reCaptchaFailed(clientIP)
                }
                throw ReCaptchaInvalidException("reCaptcha was not successfully validated")
            }
        } catch (rce: RestClientException) {
            throw ReCaptchaUnavailableException("Registration unavailable at this time.  Please try again later.", rce)
        }
        reCaptchaAttemptService!!.reCaptchaSucceeded(clientIP)
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(CaptchaServiceV3::class.java)
        const val REGISTER_ACTION = "register"
    }
}