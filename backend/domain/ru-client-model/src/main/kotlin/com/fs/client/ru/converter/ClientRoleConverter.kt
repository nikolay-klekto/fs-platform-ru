package com.fs.client.ru.converter

import com.fs.client.ru.enums.ClientRoleModel
import org.jooq.impl.EnumConverter

class ClientRoleConverter :
    EnumConverter<String, ClientRoleModel>(String::class.java, ClientRoleModel::class.java)
