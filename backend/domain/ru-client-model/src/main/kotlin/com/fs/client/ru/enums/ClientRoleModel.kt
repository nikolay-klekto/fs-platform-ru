package com.fs.client.ru.enums

enum class ClientRoleModel(val value: Long) {
    CLIENT(1),
    PARTNER(2),
    ADMIN(3),
    UNREGISTERED_CLIENT(4);

    companion object {
        private val map = ClientRoleModel.values()
            .associateBy(ClientRoleModel::value)

        fun fromString(value: Long) = ClientRoleModel.map[value]
    }
}