'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ContactsPageDesktop from '@/components/desktop/pageDesktop/ContactsPageDesktop/ContactsPageDesktop'
import ContactsPageMobi from '@/components/mobi/pageMobi/ContactsPageMobi/ContactsPageMobi'
import { Toaster } from '@/components/ui/toaster'

export default function Contacts() {
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
                    <ContactsPageDesktop />
                </>
            ) : (
                <>
                    <ContactsPageMobi />
                </>
            )}
            <Toaster />
        </div>
    )
}
