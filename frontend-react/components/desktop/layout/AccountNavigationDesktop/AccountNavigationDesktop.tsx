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
            <nav className="relative z-10">
                <ul className="flex gap-[clamp(30px,3vw,80px)]">
                    {content.map((item: IAccountNavigation) => {
                        const isActive = normalize(item.href) === normalizedActivePath
                        return (
                            <li key={item.href} className="group relative">
                                <Link
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className="relative inline-block pb-[9px] 
                                        uppercase font-bold text-4xl 4xl:text-2xl 3xl:text-xl 2xl:text-lg 
                                        bg-gradient-desktop bg-clip-text 
                                        transition-colors duration-300 ease-in-out"
                                >
                                    <span
                                        className={
                                            isActive
                                                ? 'text-transparent'
                                                : 'text-[#878797] group-hover:text-transparent'
                                        }
                                    >
                                        {item.label}
                                    </span>

                                    <span
                                        aria-hidden
                                        className={`pointer-events-none 
                                            absolute left-0 right-0 bottom-0 h-[4px]
                                            bg-gradient-desktop 
                                            opacity-0 transition-opacity duration-300
                                            ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}`}
                                    />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
