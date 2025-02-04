'use client'

import React, { useState } from 'react'
import HeaderNavigationDesktop from './HeaderNavigationDesktop/HeaderNavigationDesktop'
import router from 'next/router'
import { ShoppingCartIconDesktop, ProfileIconDesktop, LogoIconDesktop } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'
import { useModal } from '@/context/ContextModal'

const HeaderDesktop: React.FC = () => {
    const [modalType, setModalType] = useState<'login' | 'registration' | null>(null)
    const { openModal } = useModal()

    const closeModal = (): void => {
        setModalType(null)
    }

    const handleLoginSuccess = (): void => {
        closeModal()
        router.push('/profile')
    }
    return (
        <>
            <header
                className="flex h-[152px] align-items center 3xl:h-[124px] 2xl:h-[114px]"
                style={{
                    backgroundColor: 'rgb(16,16,48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.7), rgba(16,16,48,0.7)), url(/background/headerBackground.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="container flex justify-between items-center">
                    <Link href="/">
                        <LogoIconDesktop className="flex-shrink-0 3xl:w-[82px] 3xl:h-auto 2xl:w-[75px] 2xl:h-auto" />
                    </Link>
                    <div className="flex gap-[32px] px-[14px] 3xl:gap-[22px] 3xl:px-[12px] 2xl:gap-[16px] 2xl:px-[10px]">
                        <HeaderNavigationDesktop />
                        <Button
                            variant="header_desktop_btn_gradient"
                            size="header_btn"
                            onClick={(): void => openModal('modalcall_desktop', 'desktop')}
                        >
                            Заказать звонок
                        </Button>
                    </div>
                    <div className="max-w-[50px] mr-[12px] 3xl:max-w-[40px] 2xl:max-w-[40px]">
                        <ShoppingCartIconDesktop className="w-full h-auto cursor-pointer" />
                    </div>
                    <div className="max-w-[50px] 3xl:max-w-[36px] 2xl:max-w-[36px]">
                        <ProfileIconDesktop
                            className="w-full h-auto cursor-pointer"
                            onClick={(): void => openModal('login_desktop', 'desktop')}
                        />
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderDesktop
