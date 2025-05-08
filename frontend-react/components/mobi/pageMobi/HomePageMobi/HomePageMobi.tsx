import React from 'react'
import HeaderMainMobi from './components/HeaderMainMobi/HeaderMainMobi'
import HeaderCardsMobi from './components/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'
import CompaniesSectionMobi from './components/CompaniesSectionMobi/CompaniesSectionMobi'

const HomePageMobi: React.FC = () => {
    return (
        <>
            <div className="bg-[#101030]">
                <HeaderMainMobi />
                <HeaderCardsMobi />
                <HowWeWorkMobi />
                <ProfessionsSectionMobi />
                <CompaniesSectionMobi />
                <PromoMobi />
                <EventsSectionMobi />
            </div>
        </>
    )
}
export default HomePageMobi
