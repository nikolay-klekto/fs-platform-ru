'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useModal } from '@/context/ContextModal'
import { useIsAuth } from '@/hooks/useIsAuth'
import HeaderNavigationMobi from './ItemHeaderMobi/HeaderNavigationMobi'
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

interface IHeader {
    disableBackground?: boolean
}

const HeaderMobi: React.FC<IHeader> = ({ disableBackground }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isAuth = useIsAuth()
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

    const { openModal } = useModal()

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
                <div className={`relative flex h-[56px] w-full items-center justify-between px-[15px]`}>
                    <PhoneIconMobi onClick={(): void => openModal('modalcall_mobi', 'mobi')} />
                    <div className="absolute left-1/2 top-7 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/">
                            <LogoIconMobi />
                        </Link>
                    </div>
                    <div className="flex gap-[17px]">
                        <Link href="/cart">
                            <ShoppingCartIconMobi className="shrink-0" />
                        </Link>
                        <BurgerMenuIconMobi className="shrink-0" onClick={toggleMenu} />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <>
                    <div
                        role="button"
                        tabIndex={0}
                        className="fixed inset-0 z-40 bg-black bg-opacity-[70%]"
                        onClick={toggleMenu}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                toggleMenu()
                            }
                        }}
                    >
                        {' '}
                    </div>
                    <div className="absolute right-0 top-0 z-50 flex w-full flex-col items-center bg-[#101030] px-3.5 pt-9 text-white">
                        <div className="flex w-full justify-end opacity-50 transition-opacity duration-300 hover:opacity-100">
                            <CrossIconMobi onClick={toggleMenu} />
                        </div>
                        {!isAuth && (
                            <div className="sm_s:pb-10 flex flex-col items-center gap-2.5 pb-12 pt-1 sm:pb-10">
                                <button
                                    className="flex items-center gap-3.5"
                                    onClick={(): void => openModal('login_mobi', 'mobi')}
                                >
                                    <ProfileIconBurgerMobi />
                                    <p className="custom-grey whitespace-nowrap text-4xl font-semibold uppercase ">
                                        Войти в профиль
                                    </p>
                                </button>
                                <div className="bg-custom-grey h-px w-full rounded-full"></div>
                            </div>
                        )}
                        <HeaderNavigationMobi />
                        <Button
                            variant="select_mobi"
                            size="select_mobi_menu"
                            className="mt-11"
                            onClick={(): void => openModal('modalcall_mobi', 'mobi')}
                        >
                            Заказать звонок
                        </Button>
                        <div className="mt-6 flex items-center gap-6 pb-12">
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
