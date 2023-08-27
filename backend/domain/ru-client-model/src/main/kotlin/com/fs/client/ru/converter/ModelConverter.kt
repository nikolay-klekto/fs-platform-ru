package com.fs.client.ru.converter

interface ModelConverter<T, U> {
    fun toModel(rawObject: T): U
    fun fromModel(modelObject: U): T
}