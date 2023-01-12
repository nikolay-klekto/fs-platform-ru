package com.fs.ru.captcha

import com.baeldung.web.error.ReCaptchaInvalidException
import com.baeldung.web.error.ReCaptchaUnavailableException
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException
import java.net.URI

@Service("captchaService")
class CaptchaService : AbstractCaptchaService() {
    override fun processResponse(response: String) {
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
            if (!googleResponse.isSuccess) {
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
        private val LOGGER = LoggerFactory.getLogger(CaptchaService::class.java)
    }
}