'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import ProfilePageDesktop from '@/components/desktop/pageDesktop/ProfilePageDesktop/ProfilePageDesktop'
import ProfilePageMobi from '@/components/mobi/pageMobi/ProfilePageMobi/ProfilePageMobi'

export default function PersonalAccount() {
    const [isClient, setIsClient] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsClient(true)
        const accessToken = Cookies.get('accessToken')
        if (!accessToken) {
            router.push('/')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    if (!isClient || !isAuthenticated) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <HeaderDesktop />
                    <main className="min-h-[60vh] grow bg-[#101030]">
                        <ProfilePageDesktop />
                    </main>
                    <FooterDesktop />
                </>
            ) : (
                <>
                    <HeaderMobi />
                    <main className="min-h-screen grow bg-[#101030]">
                        <ProfilePageMobi />
                    </main>
                </>
            )}
        </div>
    )
}
