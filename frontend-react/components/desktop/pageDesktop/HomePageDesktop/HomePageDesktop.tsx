import React from 'react'
import HeaderMainDesktop from '../../layout/HeaderDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from '../../layout/HeaderDesktop/HeaderCardsDesktop'
import EventsSectionDesktop from '../../layout/EventsSectionDesktop/EventsSectionDesktop'
import backgroundImageConfig from '@/tailwind-config/backgroundImageConfig'

const HomePageDesktop: React.FC = () => {
    return (
        <div
            className="flex flex-col justify-between w-full"
            style={{ backgroundImage: backgroundImageConfig['header-main-gradient-desktop'] }}
        >
            <HeaderMainDesktop />
            <HeaderCardsDesktop />
            <EventsSectionDesktop />
        </div>
    )
}
export default HomePageDesktop
