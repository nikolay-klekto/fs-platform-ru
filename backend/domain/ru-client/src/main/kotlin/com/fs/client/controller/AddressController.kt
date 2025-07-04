package com.fs.client.controller

import com.fs.client.repository.AddressRepository
import com.fs.client.ru.AddressModel
import com.fs.client.ru.OfficeModel
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.web.bind.annotation.*

@Tag(name = "Address")
@RestController
@RequestMapping("/address", produces = ["application/json"])
class AddressController(private val addressRepository: AddressRepository) {

    @MutationMapping
    suspend fun addAddress(@Argument address: AddressModel): AddressModel {
        return addressRepository.insertAddress(address)
    }

    @MutationMapping
    suspend fun updateAddress(@Argument address: AddressModel): Boolean {
        return addressRepository.updateAddress(address)
    }

    @MutationMapping
    suspend fun deleteAddress(@Argument id: Long): Boolean {
        return addressRepository.deleteAddressById(id)
    }

    @SchemaMapping(typeName = "Office", field = "address")
    suspend fun getAddressForOffice(office: OfficeModel): AddressModel? {
        return addressRepository.getAddressById(office.addressId!!)
    }
<<<<<<< HEAD

    @SchemaMapping(typeName = "Event", field = "address")
    fun getAddressForEvent(event: EventModel): Mono<AddressModel> {
        return addressRepository.getAddressById(event.addressId!!)
    }
}
=======
}
>>>>>>> origin/main
