'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import EventsPageDesktop from '@/components/desktop/pageDesktop/EventsPageDesktop/EventsPageDesktop'
import EventsPageMobi from '@/components/mobi/pageMobi/EventsPageMobi/EventsPageMobi'

export default function Events() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <EventsPageDesktop />
                </>
            ) : (
                <>
                    <EventsPageMobi />
                </>
            )}
        </div>
    )
}
