'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ProfilePageDesktop from '@/components/desktop/pageDesktop/ProfilePageDesktop/ProfilePageDesktop'
import ProfilePageMobi from '@/components/mobi/pageMobi/ProfilePageMobi/ProfilePageMobi'

export default function Profile() {
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
