import React from 'react'
import HeaderMainDesktop from './components/HeaderMainDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from './components/HeaderCardsDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from './components/ProfessionSectionDesktop/ProfessionsSectionDesktop'
import HowWeWorkDesktop from './components/HowWeWorkDesktop/HowWeWorkDesktop'
import PromoDesktop from './components/PromoDesktop/PromoDesktop'
import EventsSectionDesktop from './components/EventsSectionDesktop/EventsSectionDesktop'

const HomePageDesktop: React.FC = () => {
    return (
        <>
            <div className="bg-[url('/background/main.webp')] bg-cover bg-no-repeat">
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
