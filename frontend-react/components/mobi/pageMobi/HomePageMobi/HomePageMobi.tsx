import React from 'react'
import HeaderMainMobi from './components/HeaderMainMobi'
import HeaderCardsMobi from './components/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'
import HeaderMobi from '@/components/mobi/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/FooterMobi/FooterMobi'

const HomePageMobi: React.FC = () => {
    return (
        <>
            <HeaderMobi />
            <div className="bg-[#101030]">
                <HeaderMainMobi />
                <HeaderCardsMobi />
            </div>
            <ProfessionsSectionMobi />
            <HowWeWorkMobi />
            <PromoMobi />
            <EventsSectionMobi />
            <FooterMobi />
        </>
    )
}
export default HomePageMobi
