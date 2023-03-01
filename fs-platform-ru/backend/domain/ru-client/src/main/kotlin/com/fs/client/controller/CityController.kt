package com.fs.client.controller

import com.fs.client.repository.CityRepository
import com.fs.client.ru.CityModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "City")
@RestController
@RequestMapping("/city", produces = ["application/json"])
open class CityController(open val cityRepository: CityRepository) {

    @GetMapping("{id}")
    fun getById(@PathVariable("id") cityId: Long) =
        cityRepository.getCityById(cityId)

    @GetMapping("country/{id}")
    fun getCountryByCityId(@PathVariable("id") cityId: Long) =
        cityRepository.getCountryByCityId(cityId)

    @PostMapping
    fun createCity(@RequestBody cityModel: CityModel) =
        cityRepository.createCity(cityModel)

}