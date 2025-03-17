package com.fs.photo.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

@RestController
@RequestMapping("/resumes")
class ResumeController {

    private val uploadDir = "/app/uploads/resumes/"
    private val allowedExtensions = setOf("pdf", "doc", "docx", "odt", "txt")
    private val maxSize = 50 * 1024 * 1024 // 50 MB

    @PostMapping("/upload")
    fun uploadResume(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        try {
            if (file.isEmpty) {
                return ResponseEntity.badRequest().body("error: файл пустой!")
            }

            if (file.size > maxSize) {
                return ResponseEntity.badRequest().body("error: файл слишком большой! Максимальный размер: 50 MB.")
            }

            val fileExtension = file.originalFilename?.substringAfterLast(".")?.lowercase()
            if (fileExtension !in allowedExtensions) {
                return ResponseEntity.badRequest().body("error: неподдерживаемый формат файла! Допустимые форматы: $allowedExtensions.")
            }

            val uploadPath = Path.of(uploadDir)
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath)
            }

            val destFile = uploadPath.resolve(file.originalFilename!!)
            Files.copy(file.inputStream, destFile, StandardCopyOption.REPLACE_EXISTING)

            return ResponseEntity.ok("success: резюме успешно загружено в ${destFile.toAbsolutePath()}!")
        } catch (e: IOException) {
            return ResponseEntity.status(500).body("error: ошибка при загрузке файла! Причина: ${e.message}")
        } catch (e: Exception) {
            return ResponseEntity.status(500).body("error: непредвиденная ошибка! Причина: ${e.message}")
        }
    }
}
