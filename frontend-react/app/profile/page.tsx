'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ProfilePageDesktop from '@/components/desktop/pageDesktop/ProfilePageDesktop/ProfilePageDesktop'
import ProfilePageMobi from '@/components/mobi/pageMobi/ProfilePageMobi/ProfilePageMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'

export default function Profile() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isDesktop = useMediaQuery({
        query: '(min-width: 769px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <ProfilePageDesktop />
                </>
            ) : (
                <>
                    <div className="h-[20px] bg-[#101030]"></div>
                    <HeaderMobi />
                    <main className="bg-[#101030] text-white">
                        <h1>Личный профиль</h1>
                    </main>
                    <FooterMobi />
                </>
            )}
        </div>
    )
}
