'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useIsAuth } from '@/hooks/useIsAuth'
import DuePaymentsPageDesktop from '@/components/desktop/pageDesktop/DuePaymentsPageDesktop/DuePaymentsPageDesktop'
import DuePaymentsPageMobi from '@/components/mobi/pageMobi/DuePaymentsPageMobi/DuePaymentsPageMobi'

export default function DuePayments() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isAuth = useIsAuth()

    const isDesktop = useMediaQuery({
        query: '(min-width: 1240px)',
    })

    if (!isClient || !isAuth) {
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
