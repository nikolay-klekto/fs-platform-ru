package com.fs.client.controller

import com.fs.client.repository.AddressRepository
import com.fs.client.ru.AddressModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "Address")
@RestController
@RequestMapping("/address", produces = ["application/json"])
open class AddressController(open val addressRepository: AddressRepository) {

    @GetMapping("{id}")
    fun getAddressById(@PathVariable("id") addressId: Int) =
        addressRepository.getByAddressId(addressId)

    @PostMapping
    fun insertAddressModel(
        @RequestBody addressModel: AddressModel
    ) =
        addressRepository.create(addressModel)
}