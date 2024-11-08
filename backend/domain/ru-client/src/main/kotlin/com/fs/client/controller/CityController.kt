package com.fs.client.controller

import com.fs.client.repository.CityRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.CityModel
import com.fs.client.ru.ClientModel
import com.fs.domain.jooq.tables.pojos.Event
import com.fs.service.ru.EventModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "City")
@RestController
@RequestMapping("/city", produces = ["application/json"])
open class CityController(open val cityRepository: CityRepository) {

    @GetMapping("{id}")
    fun getById(@PathVariable("id") cityId: Long) =
        cityRepository.getCityById(cityId)

    @PostMapping
    fun createCity(@RequestBody cityModel: CityModel) =
        cityRepository.insertCity(cityModel)

    @QueryMapping
    fun getCity(@Argument id: Long): Mono<CityModel?> {
        return cityRepository.getCityById(id)
    }

    @QueryMapping
    fun getAllCities(): Flux<CityModel> {
        return cityRepository.getAllCities()
    }

    @MutationMapping
    fun addCity(@Argument city: CityModel): Mono<CityModel> {
        return cityRepository.insertCity(city)
    }

    @MutationMapping
    fun deleteCity(@Argument cityId: Long): Mono<Boolean> {
        return cityRepository.deleteCity(cityId)
    }

    @SchemaMapping(typeName = "Client", field = "city")
    fun getCityForClient(client: ClientModel): Mono<CityModel?> {
        return cityRepository.getCityById(client.cityId)
    }

    @SchemaMapping(typeName = "Address", field = "city")
    fun getCityForAddress(address: AddressModel): Mono<CityModel?> {
        return cityRepository.getCityById(address.cityId!!)
    }

    @SchemaMapping(typeName = "Event", field = "city")
    fun getCityForEvent(event: Event): Mono<CityModel?> {
        return cityRepository.getCityById(event.cityId)
    }
}