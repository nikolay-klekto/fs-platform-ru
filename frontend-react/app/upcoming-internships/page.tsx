'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useIsAuth } from '@/hooks/useIsAuth'
import UpcomingInternshipsPageDesktop from '@/components/desktop/pageDesktop/UpcomingInternshipsPageDesktop/UpcomingInternshipsPageDesktop'
import UpcomingInternshipsPageMobi from '@/components/mobi/pageMobi/UpcomingInternshipsPageMobi/UpcomingInternshipsPageMobi'

export default function UpcomingInternships() {
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
                    <UpcomingInternshipsPageDesktop />
                </>
            ) : (
                <>
                    <UpcomingInternshipsPageMobi />
                </>
            )}
        </div>
    )
}
