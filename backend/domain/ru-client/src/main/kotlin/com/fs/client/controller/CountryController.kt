package com.fs.client.controller

import com.fs.client.repository.CountryRepository
import com.fs.client.ru.CityModel
import com.fs.client.ru.CountryModel
import com.fs.client.ru.enums.CountryNameModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*

@Tag(name = "Country")
@RestController
@RequestMapping("/country", produces = ["application/json"])
class CountryController(private val countryRepository: CountryRepository) {

    @SchemaMapping(typeName = "City", field = "country")
    suspend fun getCountryForCity(city: CityModel): CountryModel? {
        return countryRepository.getCountryByCode(city.countryCode!!)
    }

    @QueryMapping
    suspend fun getCountry(@Argument code: Long): CountryModel? {
        return countryRepository.getCountryByCode(code)
    }

    @QueryMapping
    suspend fun getCountryByName(@Argument name: CountryNameModel): CountryModel? {
        return countryRepository.getCountryByName(name)
    }

    @QueryMapping
    suspend fun getCountryByCity(@Argument id: Long): CountryModel? {
        return countryRepository.getCountryByCityId(id)
    }

    @QueryMapping
    suspend fun getAllCountries(): List<CountryModel> {
        return countryRepository.getAllCountries()
    }

    @MutationMapping
    suspend fun addCountry(@Argument country: CountryModel): CountryModel {
        return countryRepository.insertCountry(country)
    }

    @MutationMapping
    suspend fun deleteCountry(@Argument countryCode: Long): Boolean {
        return countryRepository.deleteCountryByCode(countryCode)
    }
}
