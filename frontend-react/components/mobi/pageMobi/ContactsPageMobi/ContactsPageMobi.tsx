import React from 'react'
import ContactsMobi from './components/ContactsMobi'
import FooterMobi from '@/components/mobi/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/HeaderMobi/HeaderMobi'

const ContactsPageMobi: React.FC = () => {
    return (
        <>
            <div className="h-[20px] bg-[#101030]"> </div>

            <HeaderMobi />
            <main className="bg-[#101030] text-white">
                <ContactsPageMobi />
            </main>
            <FooterMobi />
        </>
    )
}

export default ContactsPageMobi
