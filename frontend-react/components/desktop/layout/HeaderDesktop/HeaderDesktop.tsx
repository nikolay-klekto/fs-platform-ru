'use client'

import React from 'react'

import { LogoIcon } from '@/components/assets/icons'
import HeaderNavigationDesktop from './HeaderNavigationDesktop'
import { ShoppingCartIcon, ProfileIcon } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'

const HeaderDesktop: React.FC = () => {
    return (
        <>
            <header
                className="relative bg-[rgba(16,16,48,0.7)]"
                style={{
                    backgroundImage: 'url(/background/colorBackground.png)',
                    backgroundSize: 'cover',
                }}
            >
                <div className="absolute inset-0 bg-[rgba(16,16,48,0.7)]"></div>
                <div
                    className="container flex justify-between items-center relative z-10"
                    style={{ paddingTop: 'clamp(15px, 2vw, 34px)', paddingBottom: 'clamp(15px, 2vw, 35px)' }}
                >
                    <div className="flex flex-col justify-center items-center">
                        <LogoIcon className="2xl:w-[46px] 2xl:h-[46px] xl:w-[46px] xl:h-[42px] lg:w-[46px] lg:h-[36px]" />
                        <p className="text-white text-4xl font-semibold whitespace-nowrap 4xl:text-2xl 3xl:text-xl 2xl:text-lg xl:text-xs lg:text-xs">
                            FUN SCRUT
                        </p>
                    </div>
                    <div className="flex gap-[32px] 4xl:gap-[2vw] 3xl:gap-[10px] 2xl:gap-[10px] xl:gap-[20px] lg:gap-[1.5vw]">
                        <HeaderNavigationDesktop />
                        <Button variant="header_desktop_btn_gradient" size="header_btn">
                            Заказать звонок
                        </Button>
                    </div>
                    <div className="flex gap-[50px] 4xl:gap-[1.5vw] 3xl:gap-[20px] 2xl:gap-[1.5vw] xl:gap-[1.5vw] lg:gap-[1.5vw]">
                        <ShoppingCartIcon className="cursor-pointer flex-shrink-0 w-[50px] h-[50px] 4xl:w-[40px] 4xl:h-[40px] 3xl:w-[36px] 3xl:h-[36px] 2xl:w-[30px] 2xl:h-[30px] xl:w-[24px] xl:h-[24px] lg:w-[20px] lg:h-[20px]" />
                        <ProfileIcon className="cursor-pointer flex-shrink-0 w-[50px] h-[50px] 4xl:w-[40px] 4xl:h-[40px] 3xl:w-[36px] 3xl:h-[36px] 2xl:w-[30px] 2xl:h-[30px] xl:w-[24px] xl:h-[24px] lg:w-[20px] lg:h-[20px]" />
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderDesktop
