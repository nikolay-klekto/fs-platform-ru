'use client'

import React, { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import ContactsDesktop from './components/ContactsDesktop/ContactsDesktop'

const ContactsPageDesktop: React.FC = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <ContactsDesktop />
            </main>
            <FooterDesktop />
            <Toaster />
        </>
    )
}

export default ContactsPageDesktop
