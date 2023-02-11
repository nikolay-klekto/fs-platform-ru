package com.fs.client.service

import org.jooq.JSONFormat
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

val DB_RESULT_JSON_FORMAT = JSONFormat()
    .header(false)
    .recordFormat(JSONFormat.RecordFormat.OBJECT)

@ResponseStatus(value = HttpStatus.NOT_FOUND)
class NotFoundException : RuntimeException {
    constructor() : super()
    constructor(message: String) : super(message)
}
