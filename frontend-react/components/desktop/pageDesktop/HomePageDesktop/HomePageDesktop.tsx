import React from 'react'
import HeaderMainDesktop from '../../layout/HeaderDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from '../../layout/HeaderDesktop/HeaderCardsDesktop'
import backgroundImageConfig from '@/tailwind-config/backgroundImageConfig'

const HomePageDesktop: React.FC = () => {
    return (
        <div
            className="paddings-desktop-custom flex justify-between"
            style={{ backgroundImage: backgroundImageConfig['header-main-gradient-desktop'] }}
        >
            <HeaderMainDesktop />
            <HeaderCardsDesktop />
        </div>
    )
}
export default HomePageDesktop
