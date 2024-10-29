'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi'
import HomePageMobi from '@/components/mobi/pageMobi/HomePageMobi/HomePageMobi'
import ModalCallDesktop from '@/components/desktop/layout/ModalCallDesktop/ModalCallDesktop'

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <HeaderDesktop />
                    <main className="bg-[#101030]">
                        <HomePageDesktop />
                    </main>
                    <FooterDesktop />
                    <ModalCallDesktop />
                </>
            ) : (
                <>
                    <HeaderMobi />
                    <main className="bg-[#101030]">
                        <button>Send</button>
                        <HomePageMobi />
                    </main>
                    <FooterMobi />
                </>
            )}
        </div>
    )
}
