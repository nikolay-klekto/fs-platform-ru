package com.fs.service.ru.enums

enum class OrderStatus(val value: Long) {
    EXPIRED(1),
    ACTUAL(2),
    PRE_ORDERED(3),
    BASKET(4),
    TERMINATE_CONTRACT(5),
    DELETED_FROM_BASKET(6),
    ALARM_TERMINATE_CURRENT_ORDER(7),
    NEED_TO_APPROVE_FROM_BASKET(8),
    PRE_ORDERED_DECLINED(9);
}