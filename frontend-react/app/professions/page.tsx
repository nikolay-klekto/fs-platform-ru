'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ProfessionsPageDesktop from '@/components/desktop/pageDesktop/ProfessionsPageDesktop/ProfessionsPageDesktop'
import ProfessionsPageMobi from '@/components/mobi/pageMobi/ProfessionsPageMobi/ProfessionsPageMobi'
export default function Professions() {
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
                    <ProfessionsPageDesktop />
                </>
            ) : (
                <>
                    <ProfessionsPageMobi />
                </>
            )}
        </div>
    )
}
