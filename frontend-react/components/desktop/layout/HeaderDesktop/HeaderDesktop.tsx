'use client'

import React from 'react'
import Image from 'next/image'

import HeaderNavigationDesktop from './HeaderNavigationDesktop'
import { ShoppingCartIconDesktop, ProfileIconDesktop } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'

const HeaderDesktop: React.FC = () => {
    return (
        <>
            <header
                className="flex h-[152px] align-items center"
                style={{
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.7), rgba(16,16,48,0.7)), url(/background/headerBackground.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="container max-w-[1800px] flex justify-between items-center">
                    <Image src="/images/logo.png" alt="logo" width={100} height={83} className="w-[100px] h-[83px]" />
                    <div className="flex gap-[32px] 4xl:gap-[2vw] 3xl:gap-[10px] 2xl:gap-[10px] xl:gap-[20px] lg:gap-[1.5vw]">
                        <HeaderNavigationDesktop />
                        <Button variant="header_desktop_btn_gradient" size="header_btn">
                            Заказать звонок
                        </Button>
                    </div>
                    <ShoppingCartIconDesktop className="cursor-pointer flex-shrink-0" />
                    <ProfileIconDesktop className="cursor-pointer flex-shrink-0" />
                </div>
            </header>
        </>
    )
}

export default HeaderDesktop
