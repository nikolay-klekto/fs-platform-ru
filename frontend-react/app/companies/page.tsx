'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi'

export default function Companies() {
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
                    <main className="bg-[#101030]">
                        <h1>Companies</h1>
                    </main>
                    <FooterDesktop />
                </>
            ) : (
                <>
                    <HeaderMobi />
                    <main className="bg-[#101030]">
                        <h1>Companies</h1>
                    </main>
                    <FooterMobi />
                </>
            )}
        </div>
    )
}
