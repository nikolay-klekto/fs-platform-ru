'use client'

import React, { useState } from 'react'

import HeaderNavigationMobi from './HeaderNavigationMobi'
import {
    ShoppingCartIcon,
    ProfileIcon,
    LogoIcon,
    PhoneIcon,
    BurgerMenuIcon,
    CrossIcon,
    TelegramIcon,
    InstagramIcon,
    VkIcon,
} from '@/components/assets/icons'
import { Button } from '@/components/ui/button'

const HeaderMobi: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <>
            <header className="bg-[#101030] pl-[12px] pr-[8px]">
                <div className="max-w-[768px] flex items-center justify-between">
                    <PhoneIcon className="cursor-pointer" />
                    <div className="flex flex-col justify-center items-center">
                        <LogoIcon className="w-[34px] h-[34px]" />
                        <p className="text-white text-xs font-semibold whitespace-nowrap">FUN SCRUT</p>
                    </div>
                    <div className="flex gap-[17px]">
                        <ShoppingCartIcon className="cursor-pointer flex-shrink-0 w-[24px] h-[24px]" />
                        <BurgerMenuIcon
                            className="cursor-pointer flex-shrink-0 w-[24px] h-[24px]"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#101030] z-50 flex flex-col items-center p-6 text-white">
                    <div className="w-full flex justify-end opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <CrossIcon onClick={toggleMenu} />
                    </div>
                    <div className="flex gap-[6px] flex-col items-center pt-[8px] pb-[26px] ">
                        <div className="flex items-center gap-[10px]">
                            <ProfileIcon className="md:w-[34px] md:h-[34px] sm_xl:w-[34px] sm_xl:h-[34px] sm_l:w-[28px] sm_l:h-[28px] sm:w-[28px] sm:h-[28px]" />
                            <p className="uppercase font-semibold whitespace-nowrap md:text-5xl sm_xl:text-5xl sm_l:text-4xl sm:text-4xl">
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
                        <TelegramIcon className="cursor-pointer" />
                        <InstagramIcon className="cursor-pointer" />
                        <VkIcon className="cursor-pointer" />
                    </div>
                </div>
            )}
        </>
    )
}
export default HeaderMobi
