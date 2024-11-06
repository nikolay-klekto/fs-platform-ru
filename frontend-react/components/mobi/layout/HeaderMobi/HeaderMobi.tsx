'use client'

import React, { useState } from 'react'

import HeaderNavigationMobi from './HeaderNavigationMobi'
import {
    ShoppingCartIconMobi,
    LogoIconMobi,
    ProfileIconMobi,
    PhoneIconMobi,
    BurgerMenuIconMobi,
    CrossIconMobi,
    TelegramIconMobi,
    InstagramIconMobi,
    VkIconMobi,
} from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'

const HeaderMobi: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <>
            <header className="flex h-[48px] align-items center bg-[#101030]">
                <div className="container max-w-[768px] flex items-center justify-between relative">
                    <PhoneIconMobi className="cursor-pointer" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-6 -translate-y-1/2">
                        <LogoIconMobi />
                    </div>
                    <div className="flex gap-[17px]">
                        <ShoppingCartIconMobi className="cursor-pointer flex-shrink-0" />
                        <BurgerMenuIconMobi className="cursor-pointer flex-shrink-0" onClick={toggleMenu} />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#101030] z-50 flex flex-col items-center p-6 text-white">
                    <div className="w-full flex justify-end opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <CrossIconMobi onClick={toggleMenu} />
                    </div>
                    <div className="flex gap-[6px] flex-col items-center pt-[8px] pb-[26px] ">
                        <div className="flex items-center gap-[10px]">
                            <ProfileIconMobi />
                            <p className="uppercase font-semibold whitespace-nowrap md:text-5xl sm_xl:text-5xl sm_l:text-4xl sm_s:text-4xl sm:text-4xl">
                                Войти в профиль
                            </p>
                        </div>
                        <div className="w-full h-[2px] border-b border-white-500 border-solid"></div>
                    </div>
                    <HeaderNavigationMobi />
                    <Button variant="select_mobi" size="select_mobi_menu" className="mt-[28px]">
                        Заказать звонок
                    </Button>
                    <div className="flex gap-[18px] pt-[18px]">
                        <TelegramIconMobi className="cursor-pointer" />
                        <InstagramIconMobi className="cursor-pointer" />
                        <VkIconMobi className="cursor-pointer" />
                    </div>
                </div>
            )}
        </>
    )
}

export default HeaderMobi
