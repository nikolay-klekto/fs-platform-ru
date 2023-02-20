package com.fs.client.controller

import com.fs.client.repository.CountryRepository
import com.fs.client.ru.CountryModel
import com.fs.client.ru.enums.CountryNameModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "Country")
@RestController
@RequestMapping("/country", produces = ["application/json"])
open class CountryController(open val countryRepository: CountryRepository) {

    @GetMapping("{name}")
    fun getByCompanyId(@PathVariable("name") countryName: CountryNameModel) =
        countryRepository.getByName(countryName)

    @PostMapping
    fun createCountry(
        @RequestBody countryModel: CountryModel
    ) =
        countryRepository.insert(countryModel)

    @DeleteMapping("{name}")
    fun deleteByCountryId(@PathVariable("name") countryName: CountryNameModel) =
        countryRepository.deleteByCountryName(countryName)

}