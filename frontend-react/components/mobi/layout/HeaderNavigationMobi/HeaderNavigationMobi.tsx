'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavigationMobi: React.FC = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="bg-white w-full">
            <ul className="flex flex-col justify-center items-center bg-[#101030] w-full">
                <li
                    className={
                        isActive('/')
                            ? 'text-white py-[14px] text-7xl leading-[29px] font-semibold'
                            : 'bg-sub-title-gradient-mobi hover:bg-sub-title-gradient-mobi-hover bg-clip-text text-transparent py-[14px] text-5xl leading-[24px] font-medium'
                    }
                >
                    <Link href="/" className="uppercase">
                        Главная
                    </Link>
                </li>
                <li
                    className={
                        isActive('/professions')
                            ? 'text-white py-[14px] text-7xl leading-[29px] font-semibold'
                            : 'bg-sub-title-gradient-mobi hover:bg-sub-title-gradient-mobi-hover bg-clip-text text-transparent py-[14px] text-5xl leading-[24px] font-medium'
                    }
                >
                    <Link href="/professions" className="uppercase">
                        Профессии
                    </Link>
                </li>
                <li
                    className={
                        isActive('/companies')
                            ? 'text-white py-[14px] text-7xl leading-[29px] font-semibold'
                            : 'bg-sub-title-gradient-mobi hover:bg-sub-title-gradient-mobi-hover bg-clip-text text-transparent py-[14px] text-5xl leading-[24px] font-medium'
                    }
                >
                    <Link href="/companies" className="uppercase">
                        Компании
                    </Link>
                </li>
                <li
                    className={
                        isActive('/profile')
                            ? 'text-white py-[14px] text-7xl leading-[29px] font-semibold'
                            : 'bg-sub-title-gradient-mobi hover:bg-sub-title-gradient-mobi-hover bg-clip-text text-transparent py-[14px] text-5xl leading-[24px] font-medium'
                    }
                >
                    <Link href="/profile" className="uppercase">
                        Личный профиль
                    </Link>
                </li>
                <li
                    className={
                        isActive('/profevents')
                            ? 'text-white py-[14px] text-7xl leading-[29px] font-semibold'
                            : 'bg-sub-title-gradient-mobi hover:bg-sub-title-gradient-mobi-hover bg-clip-text text-transparent py-[14px] text-5xl leading-[24px] font-medium'
                    }
                >
                    <Link href="/profevents" className="uppercase">
                        Мероприятия
                    </Link>
                </li>
                <li
                    className={
                        isActive('/contacts')
                            ? 'text-white py-[14px] text-7xl leading-[29px] font-semibold'
                            : 'bg-sub-title-gradient-mobi hover:bg-sub-title-gradient-mobi-hover bg-clip-text text-transparent py-[14px] text-5xl leading-[24px] font-medium'
                    }
                >
                    <Link href="/contacts" className="uppercase">
                        Наши контакты
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationMobi
