package com.fs.ru.registration.repository

import com.fs.ru.registration.jpa.Person
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PersonRepository : CrudRepository<Person, Long> {

}