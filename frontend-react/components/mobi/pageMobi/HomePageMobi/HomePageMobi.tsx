import React from 'react'
import HeaderMainMobi from './components/HeaderMainMobi/HeaderMainMobi'
import HeaderCardsMobi from './components/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import ModalCookieMobi from '../../../../modals/ModalsMobi/ModalCookieMobi'

const HomePageMobi: React.FC = () => {
    return (
        <>
            <div className="bg-[#101030]">
                <HeaderMainMobi />
                <HeaderCardsMobi />

                <HowWeWorkMobi />
                <ProfessionsSectionMobi />
                <PromoMobi />
                <EventsSectionMobi />
                <ModalCookieMobi />
            </div>
            <FooterMobi />
        </>
    )
}
export default HomePageMobi
