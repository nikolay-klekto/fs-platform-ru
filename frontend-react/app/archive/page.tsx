'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ArchivePageDesktop from '@/components/ArchivePageDesktop'
import ArchivePageMobi from '@/components/ArchivePageMobi'

export default function Archive() {
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
