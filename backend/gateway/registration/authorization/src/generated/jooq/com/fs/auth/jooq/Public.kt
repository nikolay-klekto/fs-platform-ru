/*
 * This file is generated by jOOQ.
 */
package com.fs.auth.jooq


import com.fs.auth.jooq.tables.Basket
import com.fs.auth.jooq.tables.Client
import com.fs.auth.jooq.tables.ClientsRefreshTokens
import com.fs.auth.jooq.tables.CompanyProfession
import com.fs.auth.jooq.tables.Order

import kotlin.collections.List

import org.jooq.Catalog
import org.jooq.Table
import org.jooq.impl.SchemaImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class Public : SchemaImpl("public", DefaultCatalog.DEFAULT_CATALOG) {
    public companion object {

        /**
         * The reference instance of <code>public</code>
         */
        val PUBLIC: Public = Public()
    }

    /**
     * The table <code>public.basket</code>.
     */
    val BASKET: Basket get() = Basket.BASKET

    /**
     * The table <code>public.client</code>.
     */
    val CLIENT: Client get() = Client.CLIENT

    /**
     * The table <code>public.clients_refresh_tokens</code>.
     */
    val CLIENTS_REFRESH_TOKENS: ClientsRefreshTokens get() = ClientsRefreshTokens.CLIENTS_REFRESH_TOKENS

    /**
     * The table <code>public.company_profession</code>.
     */
    val COMPANY_PROFESSION: CompanyProfession get() = CompanyProfession.COMPANY_PROFESSION

    /**
     * The table <code>public.order</code>.
     */
    val ORDER: Order get() = Order.ORDER

    override fun getCatalog(): Catalog = DefaultCatalog.DEFAULT_CATALOG

    override fun getTables(): List<Table<*>> = listOf(
        Basket.BASKET,
        Client.CLIENT,
        ClientsRefreshTokens.CLIENTS_REFRESH_TOKENS,
        CompanyProfession.COMPANY_PROFESSION,
        Order.ORDER
    )
}
