'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="inline-block bg-[#101030] p-4 ">
            <ul className="inline-flex justify-evenly align-middle bg-white rounded-[50px] p-1">
                <li
                    className={
                        isActive('/')
                            ? 'text-white bg-gradient-desktop rounded-[50px] flex justify-center items-center'
                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent flex justify-center items-center'
                    }
                >
                    <Link
                        href="/"
                        className="md:px-2 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 2xl:px-14 2xl:py-5 font-bold text-4xl leading-[22px] uppercase"
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
                        className="md:px-2 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 2xl:px-14 2xl:py-5 font-bold text-4xl leading-[22px] uppercase"
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
                        className="md:px-2 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 2xl:px-14 2xl:py-5 font-bold text-4xl leading-[22px] uppercase"
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
                        className="md:px-2 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 2xl:px-14 2xl:py-5 font-bold text-4xl leading-[22px] uppercase"
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
                        className="md:px-2 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 2xl:px-14 2xl:py-5 font-bold text-4xl leading-[22px] uppercase"
                    >
                        Наши контакты
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationDesktop
