'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import UpcomingInternshipsPageDesktop from '@/components/desktop/pageDesktop/UpcomingInternshipsPageDesktop/UpcomingInternshipsPageDesktop'
import UpcomingInternshipsPageMobi from '@/components/mobi/pageMobi/UpcomingInternshipsPageMobi/UpcomingInternshipsPageMobi'
import Cookies from 'js-cookie'

export default function UpcomingInternships() {
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
