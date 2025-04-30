'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content } from './contentHeaderNavigationDesktop/content'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    return (
        <nav className="inline-block max-h-[68px] min-h-[45%] w-[54vw] max-w-[1036px]">
            <ul className="flex size-full items-center justify-between rounded-[3.125rem] bg-white p-1">
                {content.map((item) => (
                    <li
                        key={item.id}
                        className={
                            isActive(item.link)
                                ? 'flex size-full items-center justify-center rounded-[3.125rem] bg-gradient-desktop text-center text-white transition-all duration-300 ease-in-out'
                                : 'text-gradient_desktop_custom flex size-full items-center justify-center text-center transition-all duration-300 ease-in-out hover:bg-gradient-desktop-hover'
                        }
                    >
                        <Link
                            href={item.link}
                            className="font-cyrillic whitespace-nowrap px-6 text-3xl font-bold uppercase leading-loose transition-all duration-300 ease-in-out 2xl:px-2 2xl:text-xl 3xl:px-2 3xl:text-2xl 4xl:px-6 4xl:text-3xl"
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
