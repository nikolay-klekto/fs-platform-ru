import React from 'react'
import ContactsMobi from '@/components/mobi/pageMobi/ContactsPageMobi/components/ContactsMobi/ContactsMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'

const ContactsPageMobi: React.FC = () => {
    return (
        <>
            <div className="h-[20px] bg-[#101030]"> </div>

            <HeaderMobi />
            <main className="bg-[#101030] text-white">
                <ContactsMobi />
            </main>
            <FooterMobi />
        </>
    )
}

export default ContactsPageMobi
