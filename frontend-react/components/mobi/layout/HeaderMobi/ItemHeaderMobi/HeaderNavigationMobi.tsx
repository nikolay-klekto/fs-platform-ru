'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsAuth } from '@/hooks/useIsAuth'
import { content } from '@/components/mobi/layout/HeaderMobi/ItemHeaderMobi/contentHeaderNavigationMobi/content'

const HeaderNavigationMobi: React.FC = () => {
    const isAuth = useIsAuth()
    const pathname = usePathname()

    const normalize = (path: string) => path.replace(/^\/mobi/, '').replace(/\/$/, '') || '/'

    const normalizedActivePath = pathname ? normalize(pathname) : '/'
    if (!normalizedActivePath) return null

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
                            normalize(item.link) === normalizedActivePath
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
