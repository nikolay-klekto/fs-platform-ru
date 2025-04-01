import React from 'react'
import HeaderMainDesktop from './components/HeaderMainDesktop'
import HeaderCardsDesktop from './components/HeaderCardsDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from './components/ProfessionSectionDesktop/ProfessionsSectionDesktop'
import HowWeWorkDesktop from './components/HowWeWork/HowWeWorkDesktop'
import PromoDesktop from './components/PromoDesktop'
import EventsSectionDesktop from './components/EventsDesktop/EventsSectionDesktop'
const HomePageDesktop: React.FC = () => {
    return (
        <>
            <div>
                <div className="bg-header-main-gradient-desktop">
                    <div className="paddings-desktop-custom container flex justify-between">
                        <HeaderMainDesktop />
                        <HeaderCardsDesktop />
                    </div>
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
