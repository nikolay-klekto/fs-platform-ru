'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useIsAuth } from '@/hooks/useIsAuth'
import ProfilePageDesktop from '@/components/desktop/pageDesktop/ProfilePageDesktop/ProfilePageDesktop'
import ProfilePageMobi from '@/components/mobi/pageMobi/ProfilePageMobi/ProfilePageMobi'

export default function Profile() {
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
