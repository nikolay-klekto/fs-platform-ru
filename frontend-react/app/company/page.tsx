'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import CompanyPageDesktop from '@/components/desktop/pageDesktop/CompanyPageDesktop/CompanyPageDesktop'

export default function Company() {
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
                    <CompanyPageDesktop />
                </>
            ) : (
                <>
                    <h2>Тут будет страница компании</h2>
                </>
            )}
        </div>
    )
}
