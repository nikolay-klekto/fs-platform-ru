package com.fs.ru.captcha

import com.fasterxml.jackson.annotation.*
import java.util.*

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonPropertyOrder("success", "score", "action", "challenge_ts", "hostname", "error-codes")
class GoogleResponse {
    @get:JsonProperty("success")
    @set:JsonProperty("success")
    @JsonProperty("success")
    var isSuccess = false

    @get:JsonProperty("challenge_ts")
    @set:JsonProperty("challenge_ts")
    @JsonProperty("challenge_ts")
    var challengeTs: String? = null

    @get:JsonProperty("hostname")
    @set:JsonProperty("hostname")
    @JsonProperty("hostname")
    var hostname: String? = null

    @get:JsonProperty("score")
    @set:JsonProperty("score")
    @JsonProperty("score")
    var score = 0f

    @get:JsonProperty("action")
    @set:JsonProperty("action")
    @JsonProperty("action")
    var action: String? = null

    @get:JsonProperty("error-codes")
    @set:JsonProperty("error-codes")
    @JsonProperty("error-codes")
    var errorCodes: Array<ErrorCode>

    internal enum class ErrorCode {
        MissingSecret, InvalidSecret, MissingResponse, InvalidResponse, BadRequest, TimeoutOrDuplicate;

        companion object {
            private val errorsMap: MutableMap<String, ErrorCode> = HashMap(6)

            init {
                errorsMap["missing-input-secret"] = MissingSecret
                errorsMap["invalid-input-secret"] = InvalidSecret
                errorsMap["missing-input-response"] = MissingResponse
                errorsMap["bad-request"] = InvalidResponse
                errorsMap["invalid-input-response"] = BadRequest
                errorsMap["timeout-or-duplicate"] = TimeoutOrDuplicate
            }

            @JsonCreator
            fun forValue(value: String): ErrorCode? {
                return errorsMap[value.toLowerCase()]
            }
        }
    }

    @JsonIgnore
    fun hasClientError(): Boolean {
        val errors = errorCodes ?: return false
        for (error in errors) {
            when (error) {
                ErrorCode.InvalidResponse, ErrorCode.MissingResponse, ErrorCode.BadRequest -> return true
                else -> {}
            }
        }
        return false
    }

    override fun toString(): String {
        return "GoogleResponse{" + "success=" + isSuccess + ", challengeTs='" + challengeTs + '\'' + ", hostname='" + hostname + '\'' + ", score='" + score + '\'' + ", action='" + action + '\'' + ", errorCodes=" + Arrays.toString(
            errorCodes
        ) + '}'
    }
}