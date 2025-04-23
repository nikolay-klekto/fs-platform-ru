'use client'

import CompaniesPageDesktop from '@/components/desktop/pageDesktop/CompaniesPageDesktop/CompaniesPageDesktop'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function Companies() {
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
                    <main className="bg-[#101030] text-white">
                        <CompaniesPageDesktop />
                    </main>
                </>
            ) : (
                <>
                    <main className="bg-[#101030] text-white">
                        <h1>Companies</h1>
                    </main>
                </>
            )}
        </div>
    )
}
