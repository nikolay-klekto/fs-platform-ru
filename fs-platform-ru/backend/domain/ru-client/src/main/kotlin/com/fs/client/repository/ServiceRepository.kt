package com.fs.client.repository

import com.fs.service.ru.ServiceModel
import reactor.core.publisher.Mono

interface ServiceRepository {

    fun getServiceById(id: Int): Mono<ServiceModel>

}