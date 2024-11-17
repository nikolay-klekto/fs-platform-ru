import React from 'react'
import HeaderMainDesktop from '../../layout/HeaderDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from '../../layout/HeaderDesktop/HeaderCardsDesktop'
const HomePageDesktop: React.FC = () => {
    return (
        <>
            <div className="bg-header-main-gradient-desktop">
                <div className="paddings-desktop-custom container flex justify-between">
                    <HeaderMainDesktop />
                    <HeaderCardsDesktop />
                </div>
            </div>
        </>
    )
}
export default HomePageDesktop
