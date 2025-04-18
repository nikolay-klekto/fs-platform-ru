import React from 'react'
import HeaderMainDesktop from './components/HeaderMainDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from './components/HeaderCardsDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from './components/ProfessionSectionDesktop/ProfessionsSectionDesktop'
import CompaniesSectionDesktop from '../../layout/CompaniesSectionDesktop/CompaniesSectionDesktop'
import HowWeWorkDesktop from './components/HowWeWorkDesktop/HowWeWorkDesktop'
import PromoDesktop from './components/PromoDesktop/PromoDesktop'
import EventsSectionDesktop from './components/EventsSectionDesktop/EventsSectionDesktop'
import CompaniesSectionDesktop from './components/CompaniesSectionDesktop/CompaniesSectionDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

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
                <CompaniesSectionDesktop />
                <PromoDesktop />
                <EventsSectionDesktop />
            </div>
            <FooterDesktop />
        </>
    )
}
export default HomePageDesktop
