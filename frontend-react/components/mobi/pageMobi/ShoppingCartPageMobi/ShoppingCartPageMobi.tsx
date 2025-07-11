'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import { AccountNavigationMobi } from '@/components/mobi/layout/AccountNavigationMobi/AccountNavigationMobi'
import ShoppingCartMobi from './components/ShoppingCartMobi/ShoppingCartMobi'
import { content } from './contentShoppingCartPageMobi/content'
import { useIsAuth } from '@/hooks/useIsAuth'

const ShoppingCartPageMobi: React.FC = () => {
    const isAuth = useIsAuth()
    const hasOrders = content && content.length > 0

    return (
        <>
            <HeaderMobi />
            <main className="grow bg-[#101030] pb-[40px]">
                {isAuth && (
                    <div className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px]">
                        <h1 className="title28px_mobi_custom mb-4 uppercase">Личный кабинет</h1>
                        <AccountNavigationMobi />
                    </div>
                )}

                {!isAuth && !hasOrders && (
                    <div className="relative flex w-full items-center justify-center gap-[5%] py-[80px]">
                        <div className="relative flex flex-col items-center justify-center gap-10 pb-20">
                            <div className="w-[65%] text-center text-7xl font-medium leading-[40px] text-[#353652]">
                                <p>Ваша корзина пуста</p>
                                <p>
                                    Загляните на главную, чтобы выбрать понравившуюся стажировку, либо войдите в Ваш
                                    аккаунт
                                </p>
                            </div>
                            <Link href="/professions">
                                <Button variant="send_btn_desktop" size="contacts_btn_desktop">
                                    Выбрать профессию
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {isAuth && !hasOrders && (
                    <div className="flex flex-col items-center pb-[370px]">
                        <p className="mb-4 text-[#353652]">Ваша корзина пуста</p>
                        <Link href="/professions">
                            <Button variant="send_btn_desktop" size="send_btn_desktop">
                                Выбрать профессию
                            </Button>
                        </Link>
                    </div>
                )}

                {hasOrders && <ShoppingCartMobi />}
            </main>
            <FooterMobi />
        </>
    )
}
export default ShoppingCartPageMobi
