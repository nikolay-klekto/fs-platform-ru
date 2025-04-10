'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import HomePageMobi from '@/components/mobi/pageMobi/HomePageMobi/HomePageMobi'
import { useModal } from '@/context/ContextModal'

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    const { openModal } = useModal() // ✅ исправлено

    useEffect(() => {
        setIsClient(true)

        const hasSeenCookies = localStorage.getItem('hasSeenCookies')
        if (!hasSeenCookies) {
            openModal('cookie_desktop', 'desktop') // ✅ показываем модалку через контекст
            localStorage.setItem('hasSeenCookies', 'true') // ✅ сохраняем, что модалка уже была
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
                    <HomePageDesktop />
                </>
            ) : (
                <>
                    <HomePageMobi />
                </>
            )}
        </div>
    )
}
