'use client'

import { Toaster } from '@/components/ui/toaster'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import ContactsDesktop from './components/ContactsDesktop/ContactsDesktop'

const ContactsPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <ContactsDesktop />
            <FooterDesktop />
            <Toaster />
        </>
    )
}

export default ContactsPageDesktop
