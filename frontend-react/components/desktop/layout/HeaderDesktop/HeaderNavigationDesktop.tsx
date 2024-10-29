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
                <li className={isActive('/') ? 'navlink-active_desktop_custom' : 'navlink_desktop_custom'}>
                    <Link href="/" className="navlink-text_desktop_custom">
                        Главная
                    </Link>
                </li>
                <li className={isActive('/professions') ? 'navlink-active_desktop_custom' : 'navlink_desktop_custom'}>
                    <Link href="/professions" className="navlink-text_desktop_custom">
                        Профессии
                    </Link>
                </li>
                <li className={isActive('/companies') ? 'navlink-active_desktop_custom' : 'navlink_desktop_custom'}>
                    <Link href="/companies" className="navlink-text_desktop_custom">
                        Компании
                    </Link>
                </li>
                <li className={isActive('/profevents') ? 'navlink-active_desktop_custom' : 'navlink_desktop_custom'}>
                    <Link href="/profevents" className="navlink-text_desktop_custom">
                        Мероприятия
                    </Link>
                </li>
                <li className={isActive('/contacts') ? 'navlink-active_desktop_custom' : 'navlink_desktop_custom'}>
                    <Link href="/contacts" className="navlink-text_desktop_custom">
                        Наши контакты
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationDesktop
