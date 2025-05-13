'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import CompaniesPageMobi from '@/components/mobi/pageMobi/CompaniesPageMobi/CompaniesPageMobi'
export default function Companies() {
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
                    <main className="bg-[#101030] text-white">
                        <h1>Companies</h1>
                    </main>
                </>
            ) : (
                <>
                    <CompaniesPageMobi />
                </>
            )}
        </div>
    )
}
