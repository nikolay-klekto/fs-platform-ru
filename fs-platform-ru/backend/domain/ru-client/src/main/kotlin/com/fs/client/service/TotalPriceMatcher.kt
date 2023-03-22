package com.fs.client.service

import com.fs.client.ru.enums.CurrencyModel
import org.springframework.stereotype.Service

@Service
class TotalPriceMatcher {

    fun decomposeTotalPrice(totalPrice: String): Map<CurrencyModel?, Long> {

        val price: Long = totalPrice.substringBefore(" ").toLong()
        val currencyModel: CurrencyModel? = CurrencyModel.fromString(totalPrice.substringAfter(" "))
        return mapOf(Pair(currencyModel, price))
    }

}