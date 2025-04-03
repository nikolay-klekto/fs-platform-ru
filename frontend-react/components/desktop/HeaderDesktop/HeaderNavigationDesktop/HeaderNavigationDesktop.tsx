'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content } from './data/content'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    return (
        <nav className="inline-block max-h-[68px] min-h-[45%] w-[54vw] max-w-[1036px]">
            <ul className="flex size-full justify-between rounded-[3.125rem] bg-white p-1 align-middle">
                {content.map((item) => (
                    <li
                        key={item.id}
                        className={
                            isActive(item.link)
                                ? 'bg-gradient-desktop flex size-full items-center rounded-[3.125rem] text-center text-white'
                                : 'text-gradient_desktop_custom hover:bg-gradient-desktop-hover  flex size-full items-center text-center'
                        }
                    >
                        <Link
                            href={item.link}
                            className="4xl:text-2xl 3xl:text-xl w-full whitespace-nowrap px-6 text-4xl font-bold uppercase 2xl:px-4 2xl:text-base"
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
