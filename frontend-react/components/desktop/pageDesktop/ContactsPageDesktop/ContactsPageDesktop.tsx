'use client'

import React from 'react'
import ContactsDesktop from './components/ContactsDesktop/ContactsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

const ContactsPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <ContactsDesktop />
            <FooterDesktop />
        </>
    )
}

export default ContactsPageDesktop
