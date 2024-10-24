'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav>
            <ul className="flex">
                <li className={isActive('/') ? 'text-green-400' : 'text-blue-900'}>
                    <Link href="/" className="">
                        Главная
                    </Link>
                </li>
                <li className={isActive('/professions') ? 'text-green-400' : 'text-blue-900'}>
                    <Link href="/professions">Профессии</Link>
                </li>
                <li className={isActive('/companies') ? 'text-green-400' : 'text-blue-900'}>
                    <Link href="/companies">Компании</Link>
                </li>
                <li className={isActive('/profevents') ? 'text-green-400' : 'text-blue-900'}>
                    <Link href="/profevents">Мероприятия</Link>
                </li>
                <li className={isActive('/contacts') ? 'text-green-400' : 'text-blue-900'}>
                    <Link href="/contacts">Наши контакты</Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationDesktop
