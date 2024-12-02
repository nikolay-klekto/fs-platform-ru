import React from 'react'
import HeaderMainDesktop from '../../layout/HeaderDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from '../../layout/HeaderDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from '../../layout/ProfessionsSectionDesktop/ProfessionsSectionDesktop'
import HowWeWorkDesktop from '../../layout/HowWeWorkDesktop/HowWeWorkDesktop'
const HomePageDesktop: React.FC = () => {
    return (
        <>
            <div className="bg-header-main-gradient-desktop">
                <div className="paddings-desktop-custom container flex justify-between">
                    <HeaderMainDesktop />
                    <HeaderCardsDesktop />
                </div>
                <ProfessionsSectionDesktop />
                <HowWeWorkDesktop />
            </div>
        </>
    )
}
export default HomePageDesktop
