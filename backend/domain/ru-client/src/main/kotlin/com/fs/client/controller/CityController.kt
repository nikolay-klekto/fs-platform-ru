package com.fs.client.controller

import com.fs.client.repository.CityRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.CityModel
import com.fs.client.ru.ClientModel
import com.fs.domain.jooq.tables.pojos.Event
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*

@Tag(name = "City")
@RestController
@RequestMapping("/city", produces = ["application/json"])
class CityController(private val cityRepository: CityRepository) {

    @QueryMapping
    suspend fun getCity(@Argument id: Long): CityModel? {
        return cityRepository.getCityById(id)
    }

    @QueryMapping
    suspend fun getAllCities(): List<CityModel> {
        return cityRepository.getAllCities()
    }

    @QueryMapping
    suspend fun getCitiesEnumByCountryCode(@Argument code: Long): List<String> {
        return cityRepository.getCitiesEnumByCountryCode(code)
    }

    @MutationMapping
    suspend fun addCity(@Argument city: CityModel): CityModel {
        return cityRepository.insertCity(city)
    }

    @MutationMapping
    suspend fun deleteCity(@Argument cityId: Long): Boolean {
        return cityRepository.deleteCity(cityId)
    }

    @SchemaMapping(typeName = "Client", field = "city")
    suspend fun getCityForClient(client: ClientModel): CityModel? {
        return cityRepository.getCityById(client.cityId)
    }

    @SchemaMapping(typeName = "Address", field = "city")
    suspend fun getCityForAddress(address: AddressModel): CityModel? {
        return cityRepository.getCityById(address.cityId!!)
    }

    @SchemaMapping(typeName = "Event", field = "city")
    suspend fun getCityForEvent(event: Event): CityModel? {
        return cityRepository.getCityById(event.cityId)
    }
}
