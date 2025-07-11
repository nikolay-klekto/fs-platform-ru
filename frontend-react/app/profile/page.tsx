'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ProfilePageDesktop from '@/components/desktop/pageDesktop/ProfilePageDesktop/ProfilePageDesktop'
import ProfilePageMobi from '@/components/mobi/pageMobi/ProfilePageMobi/ProfilePageMobi'
import Cookies from 'js-cookie'

export default function Profile() {
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
                    <ProfilePageDesktop />
                </>
            ) : (
                <>
                    <ProfilePageMobi />
                </>
            )}
        </div>
    )
}
