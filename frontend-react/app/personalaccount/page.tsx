'use client'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
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
                    <PersonalAccountDesktop />
                </>
            ) : (
                <>
                    <main className="min-h-screen grow bg-[#101030]">
                        <PersonalAccountMobi />
                    </main>
                </>
            )}
        </div>
    )
}
