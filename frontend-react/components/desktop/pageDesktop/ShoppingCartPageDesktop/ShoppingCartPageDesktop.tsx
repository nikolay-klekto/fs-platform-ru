'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

const ShoppingCartPageDesktop: React.FC = () => {
    const isAuthorised = false

    return (
        <>
            <HeaderDesktop />
            <div className="bg-[#101030] text-white">
                <div className="relative min-h-screen overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px] 3xl:p-[76px_130px_150px_130px]">
                    <div className="radial-gradient_desktop absolute left-[-400px] top-[-330px] z-0"></div>
                    <div className="relative z-10 flex w-full flex-col items-center justify-center gap-[5%] py-[80px]">
                        {isAuthorised ? (
                            <p>You have to log in</p>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-10">
                                <div className="w-[65%] text-center text-4xl opacity-20">
                                    <p>Ваша корзина пуста</p>
                                    <p>
                                        Загляните на главную, чтобы выбрать понравившуюся стажировку, либо войдите в Ваш
                                        аккаунт
                                    </p>
                                </div>
                                <Link href={'/professions'}>
                                    <Button variant={'send_btn_desktop'} size={'contacts_btn_desktop'}>
                                        Выбрать профессию
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterDesktop />
        </>
    )
}

export default ShoppingCartPageDesktop
