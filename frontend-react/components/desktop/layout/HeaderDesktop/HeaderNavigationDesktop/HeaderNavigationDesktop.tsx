'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content } from '@/components/desktop/layout/HeaderDesktop/HeaderNavigationDesktop/content'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    return (
        <nav className="inline-block w-[54vw] max-w-[1036px] min-h-[45%] max-h-[68px]">
            <ul className="flex justify-between align-middle w-full h-full bg-white p-1 rounded-[3.125rem]">
                {content.map((item) => (
                    <li
                        key={item.id}
                        className={
                            isActive(item.link)
                                ? 'flex items-center w-full h-full text-center text-white bg-gradient-desktop rounded-[3.125rem]'
                                : 'flex items-center  w-full h-full text-center text-gradient_desktop_custom hover:bg-gradient-desktop-hover'
                        }
                    >
                        <Link
                            href={item.link}
                            className="w-full font-bold uppercase whitespace-nowrap text-4xl 4xl:text-2xl 3xl:text-xl 2xl:text-base px-6 2xl:px-4"
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
