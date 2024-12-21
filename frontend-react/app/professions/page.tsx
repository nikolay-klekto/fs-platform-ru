'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import ProfessionsPageDesktop from '@/components/desktop/pageDesktop/ProfessionsPageDesktop/ProfessionsPageDesktop'
import ProfessionsPageMobi from '@/components/mobi/pageMobi/ProfessionsPageMobi/ProfessionsPageMobi'
export default function Professions() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    })

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
                    <main className="bg-[#101030] text-white">
                        <ProfessionsPageDesktop />
                    </main>
                    <FooterDesktop />
                </>
            ) : (
                <>
                    <div className="h-[20px] bg-[#101030]"></div>
                    <HeaderMobi />
                    <main className="bg-[#101030] text-white">
                        <ProfessionsPageMobi />
                    </main>
                    <FooterMobi />
                </>
            )}
        </div>
    )
}
