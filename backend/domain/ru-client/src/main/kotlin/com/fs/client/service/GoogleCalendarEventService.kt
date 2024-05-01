package com.fs.client.service
import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import com.google.api.services.calendar.model.Event
import org.springframework.core.io.Resource
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import java.io.IOException
import java.security.GeneralSecurityException
import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets
import com.google.api.client.json.JsonFactory
import com.google.api.client.util.store.FileDataStoreFactory
import com.google.api.services.calendar.CalendarScopes
import java.io.File
import java.io.InputStream
import java.io.InputStreamReader
import java.util.*
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.services.calendar.Calendar
import java.util.Collections


@Service
class GoogleCalendarEventService(open val resourceLoader: ResourceLoader) {
    companion object {
        private const val APPLICATION_NAME = "FunScrut"
        private val JSON_FACTORY: JsonFactory = GsonFactory.getDefaultInstance()
        private const val TOKENS_DIRECTORY_PATH = "tokens"
        private const val CREDENTIALS_FILE_PATH =
            "classpath:credentials.json" // Путь до файла credentials.json в папке resources
        private const val REDIRECT_URI = "funscrut.online" // Ваш URI перенаправления

    }

        @Throws(IOException::class, GeneralSecurityException::class)
        private fun getCredentials(HTTP_TRANSPORT: NetHttpTransport): Credential {
            val resource: Resource = resourceLoader.getResource(CREDENTIALS_FILE_PATH)
            val inputStream: InputStream = resource.inputStream
            val clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, InputStreamReader(inputStream))
            val flow = GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets,
                Collections.singletonList(CalendarScopes.CALENDAR)
            )
                // Логика работы с токенами(сохранённые входы)
//                .setDataStoreFactory(FileDataStoreFactory(File(TOKENS_DIRECTORY_PATH)))
                .build()


            val receiver = LocalServerReceiver.Builder().setHost(REDIRECT_URI).setPort(8085)
                .setCallbackPath("/")
                .build()
            return AuthorizationCodeInstalledApp(flow, receiver).authorize("user")
        }

        @Throws(IOException::class, GeneralSecurityException::class)
        fun getCalendarService(resourceLoader: ResourceLoader): Calendar {
            val HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport()
            return Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build()
        }


    @Throws(IOException::class)
    fun addEventToCalendar(calendarId: String, event: Event) {
        val service = getCalendarService(resourceLoader)
        service.events().insert(calendarId, event).execute()
    }
}