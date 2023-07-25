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
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Tag(name = "Country")
@RestController
@RequestMapping("/country", produces = ["application/json"])
open class CountryController(open val countryRepository: CountryRepository) {

    @GetMapping("{name}")
    fun getByCompanyId(@PathVariable("name") countryName: CountryNameModel) =
        countryRepository.getCountryByName(countryName)

    @PostMapping
    fun createCountry(
        @RequestBody countryModel: CountryModel
    ) =
        countryRepository.insertCountry(countryModel)

    @DeleteMapping("{name}")
    fun deleteByCountryId(@PathVariable("code") countryCode: Long) =
        countryRepository.deleteCountryByCode(countryCode)

    @SchemaMapping(typeName = "City", field = "country")
    fun getCountryForCity(city: CityModel): Mono<CountryModel> {
        return countryRepository.getCountryByCode(city.countryCode!!)
    }

    @QueryMapping
    open fun getCountry(@Argument code: Long): Mono<CountryModel> {
        return countryRepository.getCountryByCode(code)
    }

    @QueryMapping
    open fun getCountryByName(@Argument name: CountryNameModel): Mono<CountryModel> {
        return countryRepository.getCountryByName(name)
    }

    @QueryMapping
    open fun getCountryByCity(@Argument id: Long): Mono<CountryModel> {
        return countryRepository.getCountryByCityId(id)
    }

    @QueryMapping
    open fun getAllCountries(): Flux<CountryModel> {
        return countryRepository.getAllCountries()
    }

    @MutationMapping
    open fun addCountry(@Argument country: CountryModel): Mono<CountryModel> {
        return countryRepository.insertCountry(country)
    }

    @MutationMapping
    open fun deleteCountry(@Argument countryCode: Long): Mono<Boolean> {
        return countryRepository.deleteCountryByCode(countryCode)
    }
}
