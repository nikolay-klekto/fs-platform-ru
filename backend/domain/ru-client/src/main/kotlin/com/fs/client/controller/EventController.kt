package com.fs.client.controller

import com.fs.client.repository.EventRepository
import com.fs.client.ru.CityModel
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import com.fs.service.ru.errors.ErrorModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path

@Tag(name = "Event")
@RestController
@RequestMapping("/events")
open class EventController(open val eventRepository: EventRepository) {

    // Укажите путь к папке, куда будут сохраняться файлы
    private val uploadDir = "/app/uploads/events/"

    @PostMapping("/upload")
    open fun uploadFile(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        return try {
            println("Получен файл: ${file.originalFilename}, размер: ${file.size} байт")

            if (file.isEmpty) {
                println("Файл пустой")
                return ResponseEntity.badRequest().body("error: файл пустой!")
            }

            val maxSize = 50 * 1024 * 1024 // 50 MB
            if (file.size > maxSize) {
                println("Файл слишком большой: ${file.size}")
                return ResponseEntity.badRequest().body("error: файл слишком большой! Максимальный размер: $maxSize байт.")
            }

            val uploadPath = Path.of(uploadDir)
            println("Путь загрузки: $uploadPath")

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath)
            }

            val destFile = uploadPath.resolve(file.originalFilename)
            file.transferTo(destFile.toFile())

            println("Файл успешно сохранён: ${destFile.toAbsolutePath()}")
            ResponseEntity.ok("success: файл успешно загружен в ${destFile.toAbsolutePath()}!")
        } catch (e: IOException) {
            println("Ошибка ввода/вывода: ${e.message}")
            ResponseEntity.status(500).body("error: ошибка при загрузке файла! Причина: ${e.message}")
        } catch (e: Exception) {
            println("Непредвиденная ошибка: ${e.message}")
            ResponseEntity.status(500).body("error: непредвиденная ошибка! Причина: ${e.message}")
        }
    }


    @QueryMapping
    open fun getEvent(@Argument eventId: Long): Mono<Event> {
        return eventRepository.getEventById(eventId)
    }

    @QueryMapping
    open fun getAllEvents(): Flux<Event> {
        return eventRepository.getAllEvents()
    }

    @QueryMapping
    open fun getAllActualEvents(): Flux<Event> {
        return eventRepository.getAllActualEvents()
    }

    @QueryMapping
    open fun getEventsAllAvailableCities(): Flux<CityModel> {
        return eventRepository.getAllAvailableCities()
    }

    @QueryMapping
    open fun getFirstNActualEvents(@Argument eventQuantity: Long): Flux<Event> {
        return eventRepository.getFirstNActualEvents(eventQuantity)
    }

    @QueryMapping
    open fun getAllActualEventsByCityId(@Argument cityId: Long): Flux<Event> {
        return eventRepository.getAllActualEventsByCityId(cityId)
    }

    @MutationMapping
    open fun addEvent(@Argument event: EventModel): Mono<ErrorModel<Long>> {
        return eventRepository.insertEvent(event)
            .onErrorResume {
                return@onErrorResume Mono.just(ErrorModel(null, it.message))
            }
    }

    @MutationMapping
    open fun updateAllEvents(@Argument events: List<EventModel>): Mono<ErrorModel<Boolean>> {
        return eventRepository.updateAllEventsModelsInfo(events)
            .onErrorResume {
                return@onErrorResume Mono.just(ErrorModel(null, it.message))
            }
    }

    @MutationMapping
    open fun updateExpiredEventsStatus(): Mono<Boolean> {
        return eventRepository.updateExpiredEventsStatus()
    }

    @MutationMapping
    open fun deleteEvent(@Argument eventId: Long): Mono<Boolean> {
        return eventRepository.deleteEvent(eventId)
    }

    @MutationMapping
    open fun deleteAllEvents(): Mono<Boolean> {
        return eventRepository.deleteAllEvents()
    }

    @MutationMapping
    open fun deleteAllExpiredEvents(): Mono<Boolean> {
        return eventRepository.deleteAllExpiredEvents()
    }

    @MutationMapping
    open fun createGoogleCalendarEvent(
        @Argument clientEmail: String,
        @Argument eventId: Long): Mono<Boolean>{
        return eventRepository.createGoogleCalendarEvent(clientEmail, eventId)
    }
}