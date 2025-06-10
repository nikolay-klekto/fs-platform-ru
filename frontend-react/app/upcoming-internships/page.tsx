'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import UpcomingInternshipsPageDesktop from '@/components/UpcomingInternshipsPageDesktop'
import UpcomingInternshipsPageMobi from '@/components/UpcomingInternshipsPageMobi'

export default function UpcomingInternships() {
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
