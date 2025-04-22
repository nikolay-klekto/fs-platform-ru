'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import PersonalAccountPageDesktop from '@/components/desktop/pageDesktop/PesronalAccountPageDesktop/PersonalAccountPageDesktop'
import PersonalAccountPageMobi from '@/components/mobi/pageMobi/PersonalAccountPageMobi/PersonalAccountPageMobi'

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
                    <PersonalAccountPageDesktop />
                </>
            ) : (
                <main className="min-h-screen grow bg-[#101030]">
                    <PersonalAccountPageMobi />
                </main>
            )}
        </div>
    )
}
