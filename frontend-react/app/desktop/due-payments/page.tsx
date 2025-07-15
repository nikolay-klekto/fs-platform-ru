'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import DuePaymentsPageDesktop from '@/components/desktop/pageDesktop/DuePaymentsPageDesktop/DuePaymentsPageDesktop'
import DuePaymentsPageMobi from '@/components/mobi/pageMobi/DuePaymentsPageMobi/DuePaymentsPageMobi'

export default function DuePayments() {
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
