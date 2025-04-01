import React from 'react'
import HeaderMainMobi from './components/HeaderMobi/HeaderMainMobi/HeaderMainMobi'
import HeaderCardsMobi from './components/HeaderMobi/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'

const HomePageMobi: React.FC = () => {
    return (
        <>
            <div>
                <HeaderMainMobi />
                <HeaderCardsMobi />
            </div>
            <ProfessionsSectionMobi />
            <HowWeWorkMobi />
            <PromoMobi />
            <EventsSectionMobi />
        </>
    )
}
export default HomePageMobi
