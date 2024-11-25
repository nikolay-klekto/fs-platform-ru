import React from 'react'
import HeaderMainDesktop from '../../layout/HeaderDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from '../../layout/HeaderDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from '../../layout/ProfessionsSectionDesktop/ProfessionsSectionDesktop'
import HowWeWorkDesktop from '../../layout/HowWeWorkDesktop/HowWeWorkDesktop'
import PromoDesktop from '../../layout/PromoDesktop/PromoDesktop'
import EventsSectionDesktop from '../../layout/EventsSectionDesktop/EventsSectionDesktop'
const HomePageDesktop: React.FC = () => {
    return (
        <>
            <div className="bg-header-main-gradient-desktop">
                <div className="paddings-desktop-custom container flex justify-between">
                    <HeaderMainDesktop />
                    <HeaderCardsDesktop />
                </div>
                <HowWeWorkDesktop />
                <ProfessionsSectionDesktop />
                <PromoDesktop />
                <EventsSectionDesktop />
            </div>
        </>
    )
}
export default HomePageDesktop
