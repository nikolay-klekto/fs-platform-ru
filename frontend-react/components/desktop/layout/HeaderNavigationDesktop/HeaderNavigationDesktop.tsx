'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="inline-block">
            <ul className="inline-flex justify-evenly align-middle bg-white rounded-[50px] p-1">
                <li className={isActive('/') ? 'navlink-active_custom' : 'navlink_custom'}>
                    <Link
                        href="/"
                        className="font-bold text-4xl leading-[22px] uppercase md:px-2 md:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 2xl:px-10 2xl:py-4 3xl:px-14 3xl:py-5"
                    >
                        Главная
                    </Link>
                </li>
                <li
                    className={
                        isActive('/professions')
                            ? 'text-white bg-gradient-desktop rounded-[50px] flex justify-center items-center'
                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent flex justify-center items-center'
                    }
                >
                    <Link
                        href="/professions"
                        className="font-bold text-4xl leading-[22px] uppercase md:px-2 md:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 2xl:px-10 2xl:py-4 3xl:px-14 3xl:py-5"
                    >
                        Профессии
                    </Link>
                </li>
                <li
                    className={
                        isActive('/companies')
                            ? 'text-white bg-gradient-desktop rounded-[50px] flex justify-center items-center'
                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent flex justify-center items-center'
                    }
                >
                    <Link
                        href="/companies"
                        className="font-bold text-4xl leading-[22px] uppercase md:px-2 md:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 2xl:px-10 2xl:py-4 3xl:px-14 3xl:py-5"
                    >
                        Компании
                    </Link>
                </li>
                <li
                    className={
                        isActive('/profevents')
                            ? 'text-white bg-gradient-desktop rounded-[50px] flex justify-center items-center'
                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent flex justify-center items-center'
                    }
                >
                    <Link
                        href="/profevents"
                        className="font-bold text-4xl leading-[22px] uppercase md:px-2 md:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 2xl:px-10 2xl:py-4 3xl:px-14 3xl:py-5"
                    >
                        Мероприятия
                    </Link>
                </li>
                <li
                    className={
                        isActive('/contacts')
                            ? 'text-white bg-gradient-desktop rounded-[50px] flex justify-center items-center'
                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent flex justify-center items-center'
                    }
                >
                    <Link
                        href="/contacts"
                        className="font-bold text-4xl leading-[22px] uppercase md:px-2 md:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 2xl:px-10 2xl:py-4 3xl:px-14 3xl:py-5"
                    >
                        Наши контакты
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationDesktop
