'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import { content } from './contentShoppingCartPageDesktop/content'
import { AccountNavigationDesktop } from '../../layout/AccountNavigationDesktop/AccountNavigationDesktop'
import ItemCardShoppingCartDesktop from './components/ItemCardShoppingCartDesktop/ItemCardShoppingCartDesktop'
import { useIsAuth } from '@/hooks/useIsAuth'

const ShoppingCartPageDesktop: React.FC = () => {
    const isAuth = useIsAuth()
    const hasOrders = content && content.length > 0

    return (
        <>
            <HeaderDesktop />
            <main className=" bg-[#101030] text-white">
                <div className="container relative overflow-hidden">
                    <div className="radial-gradient_desktop left-[150px] top-[-330px]"></div>

                    {isAuth && (
                        <div className="flex items-center justify-between pt-20">
                            <h1 className="title46px_desktop whitespace-nowrap pr-16 font-medium uppercase leading-[70%] tracking-normal">
                                Личный кабинет
                            </h1>
                            <AccountNavigationDesktop />
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

                    {hasOrders && (
                        <div className="grid pb-[50px] pt-20">
                            <div className="grid grid-cols-2 justify-between gap-[34px] self-end pb-[80px] 2xl:pb-[40px]">
                                {content.map((item) => (
                                    <ItemCardShoppingCartDesktop
                                        key={item.id}
                                        profession={item.profession}
                                        company_name={item.company_name}
                                        start_day={item.start_day}
                                        end_day={item.end_day}
                                        category={item.category}
                                        location={item.location}
                                        image={item.image}
                                        price={item.price}
                                        tooltipMessage="Удалить из корзины"
                                        id={0}
                                    />
                                ))}
                            </div>
                            <Button
                                className="flex justify-self-center"
                                variant="send_btn_desktop"
                                size="send_btn_desktop"
                            >
                                Очистить всё
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default ShoppingCartPageDesktop
