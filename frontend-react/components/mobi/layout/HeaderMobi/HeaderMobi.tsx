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
    VkIconBurgerMobi,
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
                    className={`w-full h-[56px] flex items-center justify-between relative ${!disableBackground ? 'container' : ''}`}
                >
                    <PhoneIconMobi className="cursor-pointer ml-3" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-7 -translate-y-1/2">
                        <LogoIconMobi />
                    </div>
                    <div className="flex gap-[17px] mr-2">
                        <ShoppingCartIconMobi className="cursor-pointer flex-shrink-0" />
                        <BurgerMenuIconMobi className="cursor-pointer flex-shrink-0" onClick={toggleMenu} />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-40" onClick={toggleMenu}></div>
                    <div className="absolute w-full top-0 right-0 bg-[#101030] z-50 flex flex-col items-center pt-9 px-3.5 text-white">
                        <div className="w-full flex justify-end opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                            <CrossIconMobi onClick={toggleMenu} />
                        </div>
                        <div className="flex gap-2.5 flex-col items-center pt-1 pb-12 sm_s:pb-10 sm:pb-10">
                            <div className="flex items-center gap-3.5" onClick={() => openModal('login')}>
                                <ProfileIconBurgerMobi />
                                <p className="uppercase custom-grey text-4xl font-semibold whitespace-nowrap ">
                                    Войти в профиль
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-custom-grey rounded-full"></div>
                        </div>
                        <HeaderNavigationMobi />
                        <Button variant="select_mobi" size="select_mobi_menu" className="mt-11">
                            Заказать звонок
                        </Button>
                        <div className="flex items-center gap-6 mt-6 pb-12">
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
