'use client'

import React, { useEffect, useState } from 'react'
import { useModal } from '@/context/ContextModal'
import HeaderNavigationMobi from './HeaderNavigationMobi/HeaderNavigationMobi'
import router from 'next/router'

import {
    ShoppingCartIconMobi,
    LogoIconMobi,
    ProfileIconBurgerMobi,
    PhoneIconMobi,
    BurgerMenuIconMobi,
    CrossIconMobi,
    TelegramIconBurgerMobi,
    InstagramIconBurgerMobi,
    LinkedInIconMobiBurger,
} from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'

interface HeaderMobiProps {
    disableBackground?: boolean
}

const HeaderMobi: React.FC<HeaderMobiProps> = ({ disableBackground }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen])

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
                style={
                    !disableBackground
                        ? {
                              backgroundImage: `linear-gradient(rgba(16,16,48,0.7), rgba(16,16,48,0.7)), url(/background/bgHeaderMobi.png)`,
                              backgroundSize: 'cover',
                          }
                        : undefined
                }
            >
                <div
                    className={`relative flex h-[56px] w-full items-center justify-between ${!disableBackground ? 'container' : ''}`}
                >
                    <PhoneIconMobi className="ml-3 cursor-pointer" />
                    <div className="absolute left-1/2 top-7 -translate-x-1/2 -translate-y-1/2">
                        <LogoIconMobi />
                    </div>
                    <div className="mr-2 flex gap-[17px]">
                        <ShoppingCartIconMobi className="shrink-0 cursor-pointer" />
                        <BurgerMenuIconMobi className="shrink-0 cursor-pointer" onClick={toggleMenu} />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-40" onClick={toggleMenu}>
                        {' '}
                    </div>
                    <div className="absolute w-full top-0 right-0 bg-[#101030] z-50 flex flex-col items-center pt-9 px-3.5 text-white">
                        <div className="w-full flex justify-end opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                            <CrossIconMobi onClick={toggleMenu} />
                        </div>
                        <div className="flex gap-2.5 flex-col items-center pt-1 pb-12 sm_s:pb-10 sm:pb-10">
                            <button
                                className="flex items-center gap-3.5"
                                onClick={(): void => openModal('login_mobi', 'mobi')}
                            >
                                <ProfileIconBurgerMobi />
                                <p className="custom-grey whitespace-nowrap text-4xl font-semibold uppercase ">
                                    Войти в профиль
                                </p>
                            </button>
                            <div className="w-full h-[1px] bg-custom-grey rounded-full"></div>
                        </div>
                        <HeaderNavigationMobi />
                        <Button
                            variant="select_mobi"
                            size="select_mobi_menu"
                            className="mt-11"
                            onClick={(): void => openModal('modalcall_mobi', 'mobi')}
                        >
                            Заказать звонок
                        </Button>
                        <div className="flex items-center gap-6 mt-6 pb-12">
                            <a href="href" target="_blank" rel="noopener noreferrer">
                                <TelegramIconBurgerMobi />
                            </a>
                            <a href="href" target="_blank" rel="noopener noreferrer">
                                <InstagramIconBurgerMobi />
                            </a>
                            <a href="href" target="_blank" rel="noopener noreferrer">
                                <LinkedInIconMobiBurger />
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default HeaderMobi
