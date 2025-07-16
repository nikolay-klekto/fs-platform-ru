'use client'

import React, { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import ContactsMobi from '@/components/mobi/pageMobi/ContactsPageMobi/components/ContactsMobi/ContactsMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'

const ContactsPageMobi: React.FC = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <>
            <HeaderMobi />
            <ContactsMobi />
            <FooterMobi />
            <Toaster />
        </>
    )
}

export default ContactsPageMobi
