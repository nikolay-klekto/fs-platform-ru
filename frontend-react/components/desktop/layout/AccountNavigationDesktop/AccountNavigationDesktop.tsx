'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content, IAccountNavigation } from './contentAccountNavigationDesktop/content'

export const AccountNavigationDesktop: React.FC = () => {
    const pathname = usePathname()
    const normalize = (path: string) => path.replace(/^\/desktop/, '').replace(/\/$/, '') || '/'
    const normalizedActivePath = useMemo(() => normalize(pathname || ''), [pathname])

    return (
        <>
            <nav>
                <ul className="flex gap-[clamp(30px,3vw,80px)]">
                    {content.map((item: IAccountNavigation) => (
                        <li key={item.href}>
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={true}
                                className={`4xl:text-2xl 3xl:text-xl flex cursor-pointer items-center text-center text-4xl font-bold uppercase leading-[170%] tracking-normal decoration-4 underline-offset-4 transition-all duration-300 ease-in-out 2xl:text-lg ${normalize(item.href) === normalizedActivePath ? 'bg-gradient-desktop bg-clip-text text-transparent underline decoration-[#6C41F3]' : 'hover:bg-gradient-desktop text-[#878797] hover:bg-clip-text hover:text-[#3B51A8] hover:underline'}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
