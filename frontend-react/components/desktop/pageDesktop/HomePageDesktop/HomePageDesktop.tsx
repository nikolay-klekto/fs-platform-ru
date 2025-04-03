import React from 'react'
import HeaderMainDesktop from './components/HeaderMainDesktop'
import HeaderCardsDesktop from './components/HeaderCardsDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from './components/ProfessionSectionDesktop/ProfessionsSectionDesktop'
import HowWeWorkDesktop from './components/HowWeWork/HowWeWorkDesktop'
import PromoDesktop from './components/PromoDesktop'
import EventsSectionDesktop from './components/EventsSectionDesktop/EventsSectionDesktop'
import HeaderDesktop from '@/components/desktop/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/FooterDesktop/FooterDesktop'

const HomePageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
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
            <FooterDesktop />
        </>
    )
}
export default HomePageDesktop
