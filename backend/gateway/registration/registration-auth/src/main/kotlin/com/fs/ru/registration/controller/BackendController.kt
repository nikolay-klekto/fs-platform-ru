package com.fs.ru.registration.controller

import com.fs.ru.registration.jpa.User
import com.fs.ru.registration.model.Greeting
import com.fs.ru.registration.repository.PersonRepository
import com.fs.ru.registration.repository.UserRepository
import com.fs.ru.registration.web.response.ResponseMessage
import org.apache.logging.log4j.LogManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.util.concurrent.atomic.AtomicLong

@RestController
@RequestMapping("/api")
class BackendController() {

    @Value("\${spring.mail.username}")
    lateinit var addressee: String

    @Autowired
    lateinit var personRepository: PersonRepository

    @Autowired
    lateinit var userRepository: UserRepository

    val counter = AtomicLong()

    @GetMapping("/greeting")
    fun greeting(@RequestParam(value = "name", defaultValue = "World") name: String) =
        Greeting(counter.incrementAndGet(), "Hello, $name")

    @GetMapping("/persons")
    fun getPersons() = personRepository.findAll()

    @GetMapping("/usercontent")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @ResponseBody
    fun getUserContent(authentication: Authentication): String {
        val user: User = userRepository.findByUsername(authentication.name).get()
        return "Hello " + user.username + "!"
    }

    @GetMapping("/admincontent")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    fun getAdminContent(): String {
        return "Admin's content"
    }

    @GetMapping("/sendSimpleEmail")
    @PreAuthorize("hasRole('USER')")
    fun sendSimpleEmail(): ResponseEntity<*> {
        try {
            //Uncomment to use
            //emailService.sendSimpleMessage(addressee, "Simple Email", "Hello! This is simple email")
        } catch (e: Exception) {
            log.error("Error while sending message")
            return ResponseEntity(ResponseMessage("Error while sending message"), HttpStatus.BAD_REQUEST)
        }

        return ResponseEntity(ResponseMessage("Email has been sent"), HttpStatus.OK)
    }

    @GetMapping("/sendTemplateEmail")
    @PreAuthorize("hasRole('USER')")
    fun sendTemplateEmail(): ResponseEntity<*> {
        try {
            var params: MutableMap<String, Any> = mutableMapOf()
            params["addresseeName"] = addressee
            params["signatureImage"] = "https://coderlook.com/wp-content/uploads/2019/07/spring-by-pivotal.png"
            //Uncomment to use
            //emailService.sendSimpleMessageUsingTemplate(addressee, "Template Email", "emailTemplate", params)
        } catch (e: Exception) {
            log.error("Error while sending message")
            return ResponseEntity(ResponseMessage("Error while sending message"), HttpStatus.BAD_REQUEST)
        }

        return ResponseEntity(ResponseMessage("Email has been sent"), HttpStatus.OK)
    }

    @GetMapping("/sendHtmlEmail")
    @PreAuthorize("hasRole('USER')")
    fun sendHtmlEmail(): ResponseEntity<*> {
        try {
            //Uncomment to use
            //emailService.sendHtmlMessage(addressee, "HTML Email", "<h1>Hello!</h1><p>This is HTML email</p>")
        } catch (e: Exception) {
            return ResponseEntity(ResponseMessage("Error while sending message"), HttpStatus.BAD_REQUEST)
        }

        return ResponseEntity(ResponseMessage("Email has been sent"), HttpStatus.OK)
    }

    private companion object {
        private val log = LogManager.getLogger()
    }

}
