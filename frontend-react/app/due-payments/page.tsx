'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import DuePaymentsPageDesktop from '@/components/desktop/pageDesktop/DuePaymentsPageDesktop/DuePaymentsPageDesktop'
import DuePaymentsPageMobi from '@/components/mobi/pageMobi/DuePaymentsPageMobi/DuePaymentsPageMobi'
import Cookies from 'js-cookie'

export default function DuePayments() {
    const [isClient, setIsClient] = useState(false)
    const [hasAccessToken, setHasAccessToken] = useState(false)

    const isDesktop = useMediaQuery({
        query: '(min-width: 1240px)',
    })

    useEffect(() => {
        setIsClient(true)
        const token = Cookies.get('accessToken')
        setHasAccessToken(!!token)
    }, [])

    if (!isClient || !hasAccessToken) {
        return null
    }

    return (
        <div>
            {isDesktop ? (
                <>
                    <DuePaymentsPageDesktop />
                </>
            ) : (
                <>
                    <DuePaymentsPageMobi />
                </>
            )}
        </div>
    )
}
