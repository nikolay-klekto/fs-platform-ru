'use client'

import React from 'react'
import ContactsMobi from '@/components/mobi/pageMobi/ContactsPageMobi/components/ContactsMobi/ContactsMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'

const ContactsPageMobi: React.FC = () => {
    return (
        <>
            <HeaderMobi />
            <ContactsMobi />
            <FooterMobi />
        </>
    )
}

export default ContactsPageMobi
