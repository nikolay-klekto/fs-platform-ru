package com.fs.client.ru.enums

enum class ClientRole(val value: Long) {
    CLIENT(1),
    PARTNER(2),
    ADMIN(3);

    companion object {
        private val map = ClientRole.values()
            .associateBy(ClientRole::value)

        fun fromString(value: Long) = ClientRole.map[value]
    }
}