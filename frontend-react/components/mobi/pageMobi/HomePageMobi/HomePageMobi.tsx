import React from 'react'
import HeaderMainMobi from '../../layout/HeaderMobi/HeaderMainMobi'
import HeaderCardsMobi from '../../layout/HeaderMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from '../../layout/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from '../../layout/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from '../../layout/PromoMobi/PromoMobi'
import EventsSectionMobi from '../../layout/EventsSectionMobi/EventsSectionMobi'

const HomePageMobi: React.FC = () => {
    return (
        <>
            <div>
                <HeaderMainMobi />
                <HeaderCardsMobi />
            </div>            
            <HowWeWorkMobi />
            <ProfessionsSectionMobi />
            <PromoMobi />
            <EventsSectionMobi />
        </>
    )
}
export default HomePageMobi
