'use client'

import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import ContactsDesktop from './components/ContactsDesktop/ContactsDesktop'

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
