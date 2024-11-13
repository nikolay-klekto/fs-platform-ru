import React from 'react'
import HeaderMainDesktop from '../../layout/HeaderDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from '../../layout/HeaderDesktop/HeaderCardsDesktop'
import backgroundImageConfig from '@/tailwind-config/backgroundImageConfig'
import HowWeWorkDesktop from '../../layout/HowWeWorkDesktop/HowWeWorkDesktop'

const HomePageDesktop: React.FC = () => {
    return (
        <>
            <div style={{ backgroundImage: backgroundImageConfig['header-main-gradient-desktop'] }}>
                <div className="paddings-desktop-custom container flex justify-between">
                    <HeaderMainDesktop />
                    <HeaderCardsDesktop />
                </div>
            </div>
            <HowWeWorkDesktop />
        </>
    )
}
export default HomePageDesktop
