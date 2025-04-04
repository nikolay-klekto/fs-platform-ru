'use client'

import React from 'react'
import HeaderNavigationDesktop from './HeaderNavigationDesktop/HeaderNavigationDesktop'
import Link from 'next/link'
import { ShoppingCartIconDesktop, ProfileIconDesktop, LogoIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { useModal } from '@/context/ContextModal'

const HeaderDesktop: React.FC = () => {
    const { openModal } = useModal()

    return (
        <>
            <header
                className="align-items center 3xl:h-[124px] flex h-[152px] 2xl:h-[114px]"
                style={{
                    backgroundColor: 'rgb(16,16,48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.7), rgba(16,16,48,0.7)), url(/background/headerBackground.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="container flex items-center justify-between">
                    <Link href="/">
                        <LogoIconDesktop className="3xl:w-[82px] 3xl:h-auto shrink-0 2xl:h-auto 2xl:w-[75px]" />
                    </Link>
                    <div className="3xl:gap-[22px] 3xl:px-[12px] flex gap-[32px] px-[14px] 2xl:gap-[16px] 2xl:px-[10px]">
                        <HeaderNavigationDesktop />
                        <Button
                            variant="header_desktop_btn_gradient"
                            size="header_btn"
                            onClick={(): void => openModal('modalcall_desktop', 'desktop')}
                        >
                            Заказать звонок
                        </Button>
                    </div>
                    <div className="3xl:max-w-[40px] mr-[12px] max-w-[50px] 2xl:max-w-[40px]">
                        <ShoppingCartIconDesktop className="h-auto w-full cursor-pointer" />
                    </div>
                    <div className="3xl:max-w-[36px] max-w-[50px] 2xl:max-w-[36px]">
                        <ProfileIconDesktop
                            className="h-auto w-full cursor-pointer"
                            onClick={(): void => openModal('login_desktop', 'desktop')}
                        />
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderDesktop
