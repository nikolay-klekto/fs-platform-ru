'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsAuth } from '@/hooks/useIsAuth'
import { content } from '@/components/mobi/layout/HeaderMobi/ItemHeaderMobi/contentHeaderNavigationMobi/content'

const HeaderNavigationMobi: React.FC = () => {
    const pathname = usePathname()
    const isAuth = useIsAuth()
    const isActive = (path: string) => pathname === path

    const filteredContent = content.filter((item) => {
        if (item.link === '/profile' && !isAuth) return false
        return true
    })

    return (
        <nav className="w-full">
            <ul className="flex w-full flex-col items-center justify-center">
                {filteredContent.map((item) => (
                    <li
                        key={item.id}
                        className={
                            isActive(item.link)
                                ? 'sm_s:text-5xl sm_s:py-3 py-4 text-7xl font-semibold text-white sm:py-3 sm:text-5xl'
                                : 'text-gradient_mobi_custom hover:bg-gradient-desktop-hover sm_s:text-3xl sm_s:py-3 py-4 text-5xl font-medium sm:py-3 sm:text-3xl'
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
