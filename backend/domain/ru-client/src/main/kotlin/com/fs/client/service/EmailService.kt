package com.fs.client.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(private val mailSender: JavaMailSender) {

    @Value("\${spring.mail.username}")
    lateinit var email: String

    fun sendResetPasswordEmail(to: String, resetCode: String) {
        val subject = "Password Reset Request"
        val message = """
            <p>Hello,</p>
            <p>You requested a password reset. Use the following code to reset your password:</p>
            <h2>$resetCode</h2>
            <p>If you didn't request this, please ignore this email.</p>
        """.trimIndent()

        val mimeMessage = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(mimeMessage, true)

        helper.setFrom(email)
        helper.setTo(to)
        helper.setSubject(subject)
        helper.setText(message, true) // true для HTML-сообщений

        mailSender.send(mimeMessage)
    }
}
