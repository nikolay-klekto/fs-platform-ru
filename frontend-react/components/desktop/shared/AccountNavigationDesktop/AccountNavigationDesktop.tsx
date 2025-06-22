'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { content, IAccountNavigation } from './contentAccountNavigationDesktop/content'

export const AccountNavigationDesktop: React.FC = () => {
    const pathname = usePathname()

    return (
        <>
            <nav>
                <ul className="flex gap-6">
                    {content.map((item: IAccountNavigation) => (
                        <li key={item.href}>
                            <Link
                                key={item.href}
                                href={item.href}
                                className={` text18px_desktop cursor-pointer font-bold underline-offset-8 transition-all duration-300 ease-in-out ${pathname === item.href ? 'bg-gradient-desktop bg-clip-text text-transparent underline decoration-[#6C41F3] decoration-4' : 'hover:bg-gradient-desktop text-[#878797] decoration-4 hover:bg-clip-text hover:text-[#3B51A8] hover:underline'}`}
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
