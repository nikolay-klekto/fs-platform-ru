'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HomePageMobi from '@/components/mobi/pageMobi/HomePageMobi/HomePageMobi'
import ModalCallMobi from '@/components/mobi/layout/ModalMobi/ModalCallMobi'
import ModalCallDesktop from '@/components/desktop/layout/ModalDesktop/ModalCallDesktop'

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)
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
                    <HeaderDesktop onOpenModalCallDesktop={handleOpenModal} />
                    <main className="bg-[url('/background/main.svg')] bg-cover bg-no-repeat">
                        <HomePageDesktop />
                    </main>
                    <FooterDesktop />
                    <ModalCallDesktop isOpen={isModalOpen} onClose={handleCloseModal} />
                </>
            ) : (
                <>
                    <main className="bg-[#101030]">
                        <button>Send</button>
                        <HomePageMobi />
                    </main>
                    <FooterMobi />
                    <ModalCallMobi />
                </>
            )}
        </div>
    )
}
