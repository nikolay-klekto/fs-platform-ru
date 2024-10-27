'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationMobi: React.FC = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="w-full">
            <ul className="flex flex-col justify-center items-center bg-[#101030] w-full">
                <li className={isActive('/') ? 'navlink-active_mobi_custom' : 'navlink_mobi_custom'}>
                    <Link href="/" className="uppercase">
                        Главная
                    </Link>
                </li>
                <li className={isActive('/professions') ? 'navlink-active_mobi_custom' : 'navlink_mobi_custom'}>
                    <Link href="/professions" className="uppercase">
                        Профессии
                    </Link>
                </li>
                <li className={isActive('/companies') ? 'navlink-active_mobi_custom' : 'navlink_mobi_custom'}>
                    <Link href="/companies" className="uppercase">
                        Компании
                    </Link>
                </li>
                <li className={isActive('/profile') ? 'navlink-active_mobi_custom' : 'navlink_mobi_custom'}>
                    <Link href="/profile" className="uppercase">
                        Личный профиль
                    </Link>
                </li>
                <li className={isActive('/profevents') ? 'navlink-active_mobi_custom' : 'navlink_mobi_custom'}>
                    <Link href="/profevents" className="uppercase">
                        Мероприятия
                    </Link>
                </li>
                <li className={isActive('/contacts') ? 'navlink-active_mobi_custom' : 'navlink_mobi_custom'}>
                    <Link href="/contacts" className="uppercase">
                        Наши контакты
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationMobi
