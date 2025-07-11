import React from 'react'
import HeaderMainMobi from './components/HeaderMainMobi/HeaderMainMobi'
import HeaderCardsMobi from './components/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'

const HomePageMobi: React.FC = () => {
    return (
        <>
            <header className="bg-[#101030]">
                <HeaderMainMobi />
                <HeaderCardsMobi />
            </header>
            <main className="bg-[#101030]">
                <HowWeWorkMobi />
                <ProfessionsSectionMobi />
                <PromoMobi />
                <EventsSectionMobi />
            </main>
            <FooterMobi />
        </>
    )
}
export default HomePageMobi
