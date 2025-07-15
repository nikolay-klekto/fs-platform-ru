'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import PrivacyPolicyPageDesktop from '@/components/desktop/pageDesktop/PrivacyPolicyPageDesktop/PrivacyPolicyPageDesktop'

export default function PrivacyPolisyPage() {
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
                    <PrivacyPolicyPageDesktop />
                </>
            ) : (
                <>
                    <h2>The mobil Policy page will be here</h2>
                </>
            )}
        </div>
    )
}
