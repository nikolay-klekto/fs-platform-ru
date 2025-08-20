'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import { AccountNavigationMobi } from '@/components/mobi/layout/AccountNavigationMobi/AccountNavigationMobi'
//import ShoppingCartMobi from './components/ShoppingCartMobi/ShoppingCartMobi'
import ItemCardShoppingCartMobi from '@/components/mobi/pageMobi/ShoppingCartPageMobi/components/ItemCardShoppingCartMobi/ItemCardShoppingCartMobi'
import { content } from './contentShoppingCartPageMobi/content'
import { useIsAuth } from '@/hooks/useIsAuth'

const ShoppingCartPageMobi: React.FC = () => {
    const isAuth = useIsAuth()
    const hasOrders = content && content.length > 0

    return (
        <>
            <HeaderMobi />
            <main className="grow bg-[#101030] pb-[40px] px-[15px]">
                {/* авторизованный */}
                {isAuth && (
                    <div className="flex flex-col items-center justify-center bg-[#101030] pt-[40px]">
                        <h1 className="title28px_mobi_custom mb-[20px] uppercase">Личный кабинет</h1>
                        <AccountNavigationMobi />
                    </div>
                )}
                {/* неавторизованный корзина пустая */}
                {!isAuth && !hasOrders && (
                    <div className="flex flex-col items-center pt-[160px] pb-[370px]">
                        <div className="text-3xl text-semibold leading-[162%] text-center px-[15px] mb-[47px] text-[#353652]">
                            <p> Ваша корзина пуста</p>
                            <p>
                                Загляните на главную чтобы выбрать понравившуюся стажировку, либо войдите в Ваш аккаунт
                            </p>
                        </div>
                        <Link href="/professions">
                            <Button variant="send_btn_mobi" size="send_btn_desktop">
                                Выбрать профессию
                            </Button>
                        </Link>
                    </div>
                )}
                {/* авторизованный, корзина пустая */}
                {isAuth && !hasOrders && (
                    <div className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px] pb-[400px]">
                        <p className="text-3xl text-semibold leading-[162%] text-center px-[15px] mt-[70px] mb-[20px] text-[#353652]">
                            Ваша корзина пуста
                        </p>
                        <Link href="/professions">
                            <Button variant="send_btn_mobi" size="send_btn_desktop">
                                Выбрать профессию
                            </Button>
                        </Link>
                    </div>
                )}
                {/* корзина полная*/}
                {hasOrders && (
                    <div className="pt-[35px] mx-15 text-center">
                        <div className="flex flex-wrap justify-center gap-[34px] self-end pb-[50px] 2xl:pt-[75px]">
                            {content.map((item) => (
                                <ItemCardShoppingCartMobi
                                    key={item.id}
                                    profession={item.profession}
                                    company_name={item.company_name}
                                    start_day={item.start_day}
                                    end_day={item.end_day}
                                    category={item.category}
                                    location={item.location}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}
                        </div>
                        <Button variant={'select_mobi'} size={'registration_mobi'} className="w-[294px] text-[17px]">
                            Очистить всё
                        </Button>
                    </div>
                )}
            </main>
        </>
    )
}
export default ShoppingCartPageMobi
