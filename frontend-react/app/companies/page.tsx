'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import CompaniesPageMobi from '@/components/mobi/pageMobi/CompaniesPageMobi/CompaniesPageMobi'
import CompaniesPageDesktop from '@/components/desktop/pageDesktop/CompaniesPageDesktop/CompaniesPageDesktop'

export default function Companies() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isDesktop = useMediaQuery({
        query: '(min-width: 1240px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <CompaniesPageDesktop />
                </>
            ) : (
                <>
                    <CompaniesPageMobi />
                </>
            )}
        </div>
    )
}
