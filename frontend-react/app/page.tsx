'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HomePageMobi from '@/components/mobi/pageMobi/HomePageMobi/HomePageMobi'
import ModalCallMobi from '@/components/mobi/layout/ModalMobi/ModalCallMobi'
import ModalCallDesktop from '@/components/desktop/layout/ModalDesktop/ModalCallDesktop'
import ModalCookieDesktop from '@/components/desktop/layout/ModalDesktop/ModalCookieDesktop'

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    const [isModalCallDesktopOpen, setModalCallDesktopOpen] = useState(false)
    const handleOpenModalCallDesktop = () => setModalCallDesktopOpen(true)
    const handleCloseModalCallDesktop = () => setModalCallDesktopOpen(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

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
                    <HeaderDesktop onOpenModalCallDesktop={handleOpenModalCallDesktop} />
                    <main className="bg-[url('/background/main.webp')] bg-cover bg-no-repeat">
                        <HomePageDesktop />
                    </main>
                    <FooterDesktop />
                    <ModalCallDesktop isOpen={isModalCallDesktopOpen} onClose={handleCloseModalCallDesktop} />
                    <ModalCookieDesktop />
                </>
            ) : (
                <>
                    <main className="bg-[#101030]">
                        <HomePageMobi />
                    </main>
                    <FooterMobi />
                    <ModalCallMobi />
                </>
            )}
        </div>
    )
}
