'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content } from './contentHeaderNavigationDesktop/content'

const HeaderNavigationDesktop: React.FC = () => {
    const pathname = usePathname()
    const normalize = (path: string) => path.replace(/^\/(desktop)/, '').replace(/\/$/, '') || '/'
    const normalizedPath = useMemo(() => normalize(pathname || ''), [pathname])

    return (
        <nav className="inline-block max-h-[68px] min-h-[45%] w-[54vw] max-w-[1036px]">
            <ul className="flex size-full items-center justify-between rounded-[3.125rem] bg-white p-1">
                {content.map((item) => (
                    <li
                        key={item.id}
                        className={
                            normalize(item.link) === normalizedPath
                                ? 'bg-gradient-desktop flex size-full items-center justify-center rounded-[3.125rem] text-center text-white transition-all duration-300 ease-in-out'
                                : 'text-gradient_desktop_custom hover:bg-gradient-desktop-hover flex size-full items-center justify-center text-center transition-all duration-300 ease-in-out'
                        }
                    >
                        <Link
                            href={item.link}
                            className="font-cyrillic 3xl:px-2 3xl:text-2xl 4xl:px-6 4xl:text-3xl whitespace-nowrap px-6 text-3xl font-bold uppercase leading-loose transition-all duration-300 ease-in-out 2xl:px-2 2xl:text-xl"
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
