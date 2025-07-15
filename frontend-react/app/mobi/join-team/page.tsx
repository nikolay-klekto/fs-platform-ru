'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import JoinTeamPageMobi from '@/components/mobi/pageMobi/JoinTeamPageMobi/JoinTeamPageMobi'

export default function JoinTeam() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isMobi = useMediaQuery({
        query: '(max-width: 768px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isMobi && (
                <>
                    <JoinTeamPageMobi />
                </>
            )}
        </div>
    )
}
