import React from 'react'
import ContactsDesktop from './components/ContactsDesktop'
import HeaderDesktop from '@/components/desktop/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/FooterDesktop/FooterDesktop'

const ContactsPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <ContactsDesktop />
            </main>
            <FooterDesktop />
        </>
    )
}

export default ContactsPageDesktop
