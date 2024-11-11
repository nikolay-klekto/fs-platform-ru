'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationMobi: React.FC = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    interface IHeaderNavigationMobi {
        title: string
        link: string
    }
    const content: IHeaderNavigationMobi[] = [
        {
            title: 'Главная',
            link: '/',
        },
        {
            title: 'Профессии',
            link: '/professions',
        },
        {
            title: 'Компании',
            link: '/companies',
        },
        {
            title: 'Личный профиль',
            link: '/profile',
        },
        {
            title: 'Мероприятия',
            link: '/profevents',
        },
        {
            title: 'Наши контакты',
            link: '/contacts',
        },
    ]

    return (
        <nav className="w-full">
            <ul className="flex flex-col justify-center items-center w-full">
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={
                            isActive(item.link)
                                ? 'text-white font-semibold text-7xl sm_s:text-5xl sm:text-5xl py-4 sm_s:py-3 sm:py-3'
                                : 'text-gradient_mobi_custom hover:bg-gradient-desktop-hover font-medium text-5xl sm_s:text-3xl sm:text-3xl py-4 sm_s:py-3 sm:py-3'
                        }
                    >
                        <Link href={item.link} className="uppercase">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default HeaderNavigationMobi
