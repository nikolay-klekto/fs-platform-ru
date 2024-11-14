'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content } from '@/components/mobi/layout/HeaderMobi/HeaderNavigationMobi/content'

const HeaderNavigationMobi: React.FC = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    return (
        <nav className="w-full">
            <ul className="flex flex-col justify-center items-center w-full">
                {content.map((item) => (
                    <li
                        key={item.id}
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
