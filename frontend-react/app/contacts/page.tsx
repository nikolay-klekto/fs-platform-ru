'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import ContactsPageDesktop from '@/components/desktop/pageDesktop/ContactsPageDesktop/ContactsPageDesktop'
import ContactsPageMobi from '@/components/mobi/pageMobi/ContactsPageMobi/ContactsPageMobi'
import { Toaster } from '@/components/ui/toaster'

export default function Contacts() {
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
                    <main className="bg-[#101030] text-white">
                        <ContactsPageDesktop />
                    </main>
                    <FooterDesktop />
                </>
            ) : (
                <>
                    <div className="h-[20px] bg-[#101030]"> </div>
                    <HeaderMobi />
                    <main className="bg-[#101030] text-white">
                        <ContactsPageMobi />
                    </main>
                    <FooterMobi />
                </>
            )}
            <Toaster />
        </div>
    )
}
