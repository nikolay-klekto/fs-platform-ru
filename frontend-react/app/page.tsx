'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import HomePageMobi from '@/components/mobi/pageMobi/HomePageMobi/HomePageMobi'
import { useModal } from '@/context/ContextModal'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    const { openModal } = useModal()

    useEffect(() => {
        setIsClient(true)

        const hasSeenCookies = localStorage.getItem('hasSeenCookies')
        if (!hasSeenCookies) {
            openModal('cookie_desktop', 'desktop')
            localStorage.setItem('hasSeenCookies', 'true')
        }
    }, [openModal])

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
                    <HomePageDesktop />
                    <FooterDesktop />
                </>
            ) : (
                <>
                    <HomePageMobi />
                </>
            )}
        </div>
    )
}
