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
open class CompaniesPhotoController() {

    // ������� ���� � �����, ���� ����� ����������� �����
    private val uploadDir = "/app/uploads/companies/facade/"

    // ������� ���� � �����, ���� ����� ����������� �����
    private val uploadLogoDir = "/app/uploads/companies/logo/"

    @PostMapping("/upload/facade")
    open fun uploadFileFacade(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        return try {
            println("������� ����: ${file.originalFilename}, ������: ${file.size} ����")

            if (file.isEmpty) {
                println("���� ������")
                return ResponseEntity.badRequest().body("error: ���� ������!")
            }

            val maxSize = 50 * 1024 * 1024 // 50 MB
            if (file.size > maxSize) {
                println("���� ������� �������: ${file.size}")
                return ResponseEntity.badRequest()
                    .body("error: ���� ������� �������! ������������ ������: $maxSize ����.")
            }

            val uploadPath = Path.of(uploadDir)
            println("���� ��������: $uploadPath")

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath)
            }

            val destFile = uploadPath.resolve(file.originalFilename)
            file.transferTo(destFile.toFile())

            println("���� ������� �������: ${destFile.toAbsolutePath()}")
            ResponseEntity.ok("success: ���� ������� �������� � ${destFile.toAbsolutePath()}!")
        } catch (e: IOException) {
            println("������ �����/������: ${e.message}")
            ResponseEntity.status(500).body("error: ������ ��� �������� �����! �������: ${e.message}")
        } catch (e: Exception) {
            println("�������������� ������: ${e.message}")
            ResponseEntity.status(500).body("error: �������������� ������! �������: ${e.message}")
        }
    }

    @PostMapping("/upload/logo")
    open fun uploadFileLogo(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        return try {
            println("������� ����: ${file.originalFilename}, ������: ${file.size} ����")

            if (file.isEmpty) {
                println("���� ������")
                return ResponseEntity.badRequest().body("error: ���� ������!")
            }

            val maxSize = 50 * 1024 * 1024 // 50 MB
            if (file.size > maxSize) {
                println("���� ������� �������: ${file.size}")
                return ResponseEntity.badRequest()
                    .body("error: ���� ������� �������! ������������ ������: $maxSize ����.")
            }

            val uploadPath = Path.of(uploadDir)
            println("���� ��������: $uploadPath")

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath)
            }

            val destFile = uploadPath.resolve(file.originalFilename)
            file.transferTo(destFile.toFile())

            println("���� ������� �������: ${destFile.toAbsolutePath()}")
            ResponseEntity.ok("success: ���� ������� �������� � ${destFile.toAbsolutePath()}!")
        } catch (e: IOException) {
            println("������ �����/������: ${e.message}")
            ResponseEntity.status(500).body("error: ������ ��� �������� �����! �������: ${e.message}")
        } catch (e: Exception) {
            println("�������������� ������: ${e.message}")
            ResponseEntity.status(500).body("error: �������������� ������! �������: ${e.message}")
        }
    }
}