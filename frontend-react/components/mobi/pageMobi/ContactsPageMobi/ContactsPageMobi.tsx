'use client'

import { Toaster } from '@/components/ui/toaster'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import ContactsMobi from '@/components/mobi/pageMobi/ContactsPageMobi/components/ContactsMobi/ContactsMobi'

const ContactsPageMobi: React.FC = () => {
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
