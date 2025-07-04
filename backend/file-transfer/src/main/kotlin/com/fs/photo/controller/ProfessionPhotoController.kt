package com.fs.photo.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path

@RestController
@RequestMapping("/professions")
open class ProfessionPhotoController() {

    // Укажите путь к папке, куда будут сохраняться файлы
    private val uploadDir = "/app/uploads/professions/"

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
                return ResponseEntity.badRequest()
                    .body("error: файл слишком большой! Максимальный размер: $maxSize байт.")
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
}