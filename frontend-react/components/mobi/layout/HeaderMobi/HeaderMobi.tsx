'use client'

import React, { useEffect, useState } from 'react'

import HeaderNavigationMobi from './HeaderNavigationMobi/HeaderNavigationMobi'
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
import RegistrationModalMobi from '@/components/mobi/layout/RegistrationModalMobi/RegistrationModalMobi'
import LoginModalMobi from '@/components/mobi/layout/LoginModalMobi/LoginModalMobi'

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

    const openModal = (type: 'login' | 'registration') => {
        setModalType(type)
    }

    const closeModal = () => {
        setModalType(null)
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
                    className={`relative flex h-[56px] w-full px-[15px] items-center justify-between ${!disableBackground ? 'container' : ''}`}
                >
                    <PhoneIconMobi className="cursor-pointer" />
                    <div className="absolute left-1/2 top-7 -translate-x-1/2 -translate-y-1/2">
                        <LogoIconMobi />
                    </div>
                    <div className="flex gap-[17px]">
                        <ShoppingCartIconMobi className="shrink-0 cursor-pointer" />
                        <BurgerMenuIconMobi className="shrink-0 cursor-pointer" onClick={toggleMenu} />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-70" onClick={toggleMenu}></div>
                    <div className="absolute right-0 top-0 z-50 flex w-full flex-col items-center bg-[#101030] px-3.5 pt-9 text-white">
                        <div className="flex w-full cursor-pointer justify-end opacity-50 transition-opacity duration-300 hover:opacity-100">
                            <CrossIconMobi onClick={toggleMenu} />
                        </div>
                        <div className="sm_s:pb-10 flex flex-col items-center gap-2.5 pb-12 pt-1 sm:pb-10">
                            <div className="flex items-center gap-3.5" onClick={() => openModal('login')}>
                                <ProfileIconBurgerMobi />
                                <p className="custom-grey whitespace-nowrap text-4xl font-semibold uppercase ">
                                    Войти в профиль
                                </p>
                            </div>
                            <div className="bg-custom-grey h-px w-full rounded-full"></div>
                        </div>
                        <HeaderNavigationMobi />
                        <Button variant="select_mobi" size="select_mobi_menu" className="mt-11">
                            Заказать звонок
                        </Button>
                        <div className="mt-6 flex items-center gap-6 pb-12">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <TelegramIconBurgerMobi />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <InstagramIconBurgerMobi />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <LinkedInIconMobiBurger />
                            </a>
                        </div>
                    </div>
                    {modalType === 'login' && (
                        <LoginModalMobi
                            closeModal={closeModal}
                            openRegistrationModal={() => openModal('registration')}
                        />
                    )}

                    {modalType === 'registration' && (
                        <RegistrationModalMobi closeModal={closeModal} openLoginModal={() => openModal('login')} />
                    )}
                </>
            )}
        </>
    )
}

export default HeaderMobi
