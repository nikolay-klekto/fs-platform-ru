'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="bg-[#101030] p-4">
            <ul className="inline-flex justify-evenly align-middle bg-background rounded-[50px] p-1">
                <li
                    className={
                        isActive('/')
                            ? 'text-white bg-dark-gradient px-[57.5px] py-[19px] rounded-[50px]'
                            : 'bg-dark-gradient hover:bg-light-gradient bg-clip-text text-transparent px-[57.5px] py-[19px]'
                    }
                >
                    <Link href="/" className="font-bold text-[18px] leading-[22px] uppercase">
                        Главная
                    </Link>
                </li>
                <li
                    className={
                        isActive('/professions')
                            ? 'text-white bg-dark-gradient px-[57.5px] py-[19px] rounded-[50px]'
                            : 'bg-dark-gradient hover:bg-light-gradient bg-clip-text text-transparent px-[57.5px] py-[19px]'
                    }
                >
                    <Link href="/professions" className="font-bold text-[18px] leading-[22px] uppercase">
                        Профессии
                    </Link>
                </li>
                <li
                    className={
                        isActive('/companies')
                            ? 'text-white bg-dark-gradient px-[57.5px] py-[19px] rounded-[50px]'
                            : 'bg-dark-gradient hover:bg-light-gradient bg-clip-text text-transparent px-[57.5px] py-[19px]'
                    }
                >
                    <Link href="/companies" className="font-bold text-[18px] leading-[22px] uppercase">
                        Компании
                    </Link>
                </li>
                <li
                    className={
                        isActive('/profevents')
                            ? 'text-white bg-dark-gradient px-[57.5px] py-[19px] rounded-[50px]'
                            : 'bg-dark-gradient hover:bg-light-gradient bg-clip-text text-transparent px-[57.5px] py-[19px]'
                    }
                >
                    <Link href="/profevents" className="font-bold text-[18px] leading-[22px] uppercase">
                        Мероприятия
                    </Link>
                </li>
                <li
                    className={
                        isActive('/contacts')
                            ? 'text-white bg-dark-gradient px-[57.5px] py-[19px] rounded-[50px]'
                            : 'bg-dark-gradient hover:bg-light-gradient bg-clip-text text-transparent px-[57.5px] py-[19px]'
                    }
                >
                    <Link href="/contacts" className="font-bold text-[18px] leading-[22px] uppercase">
                        Наши контакты
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationDesktop
