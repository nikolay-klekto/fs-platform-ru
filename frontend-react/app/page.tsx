'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
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
                    <HomePageDesktop />
                    {showCookies && <ModalCookieDesktop onClose={handleCloseCookies} />}
                </>
            ) : (
                <>
                    <HomePageMobi />
                </>
            )}
        </div>
    )
}
