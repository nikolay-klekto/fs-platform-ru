import React from 'react'
import HeaderMainMobi from '../../layout/HeaderMobi/HeaderMainMobi'
import HeaderCardsMobi from '../../layout/HeaderMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from '../../layout/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from '../../layout/HowWeWorkMobi/HowWeWorkMobi'
const HomePageMobi: React.FC = () => {
    return (
        <>
            <div>
                <HeaderMainMobi />
                <HeaderCardsMobi />
            </div>
            <HowWeWorkMobi />
            <ProfessionsSectionMobi />
        </>
    )
}
export default HomePageMobi
