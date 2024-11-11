'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    interface IHeaderNavigationDesktop {
        title: string
        link: string
    }
    const content: IHeaderNavigationDesktop[] = [
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
            title: 'Мероприятия',
            link: '/profevents',
        },
        {
            title: 'Наши контакты',
            link: '/contacts',
        },
    ]

    return (
        <nav className="inline-block w-[54vw] max-w-[1036px] min-h-[45%] max-h-[68px]">
            <ul className="flex justify-between align-middle w-full h-full bg-white p-1 rounded-[3.125rem]">
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={
                            isActive(item.link)
                                ? 'flex items-center w-full h-full text-center text-white bg-gradient-desktop rounded-[3.125rem]'
                                : 'flex items-center  w-full h-full text-center text-gradient_desktop_custom hover:bg-gradient-desktop-hover'
                        }
                    >
                        <Link
                            href={item.link}
                            className="w-full font-bold uppercase whitespace-nowrap text-4xl 4xl:text-2xl 3xl:text-xl 2xl:text-base px-6"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default HeaderNavigationDesktop
