'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ArchivePageDesktop from '@/components/desktop/pageDesktop/ArchivePageDesktop/ArchivePageDesktop'
import ArchivePageMobi from '@/components/mobi/pageMobi/ArchivePageMobi/ArchivePageMobi'
import Cookies from 'js-cookie'

export default function Archive() {
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
                    <ArchivePageDesktop />
                </>
            ) : (
                <>
                    <ArchivePageMobi />
                </>
            )}
        </div>
    )
}
