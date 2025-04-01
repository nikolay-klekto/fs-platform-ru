'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HeaderMobi from '@/components/mobi/pageMobi/HomePageMobi/components/HeaderMobi/HeaderMainMobi/ItemHeaderMobi/HeaderMobi'
import PersonalAccountDesktop from '@/components/desktop/pageDesktop/PesronalAccountPageDesktop/PersonalAccountPageDesktop'
import PersonalAccountMobi from '@/components/mobi/pageMobi/PersonalAccountPageMobi/PersonalAccountMobi'

export default function PersonalAccount() {
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
                    <main className="min-h-[60vh] grow bg-[#101030]">
                        <PersonalAccountDesktop />
                    </main>
                    <FooterDesktop />
                </>
            ) : (
                <>
                    <HeaderMobi />
                    <main className="min-h-screen grow bg-[#101030]">
                        <PersonalAccountMobi />
                    </main>
                </>
            )}
        </div>
    )
}
