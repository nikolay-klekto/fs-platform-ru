'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HomePageMobi from '@/components/mobi/pageMobi/HomePageMobi/HomePageMobi'
import ModalCookieDesktop from '@/components/desktop/layout/ModalDesktop/ModalCookieDesktop'

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    const [showCookies, setShowCookies] = useState(false)

    useEffect(() => {
        setIsClient(true)

        const hasSeenCookies = localStorage.getItem('hasSeenCookies')
        if (!hasSeenCookies) {
            setShowCookies(true)
        }
    }, [])

    const handleCloseCookies = () => {
        setShowCookies(false)
        localStorage.setItem('hasSeenCookies', 'true')
    }

    const isDesktop = useMediaQuery({
        query: '(min-width: 1240px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <HeaderDesktop />
                    <main className="bg-[url('/background/main.webp')] bg-cover bg-no-repeat">
                        <HomePageDesktop />
                    </main>
                    <FooterDesktop />
                    {showCookies && <ModalCookieDesktop onClose={handleCloseCookies} />}
                </>
            ) : (
                <>
                    <main className="bg-[#101030]">
                        <HomePageMobi />
                    </main>
                    <FooterMobi />
                </>
            )}
        </div>
    )
}
