'use client'

import React, { useEffect } from 'react'
import { useModal } from '@/context/ContextModal'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import HeaderMainDesktop from './components/HeaderMainDesktop/HeaderMainDesktop'
import HeaderCardsDesktop from './components/HeaderCardsDesktop/HeaderCardsDesktop'
import ProfessionsSectionDesktop from './components/ProfessionSectionDesktop/ProfessionsSectionDesktop'
import HowWeWorkDesktop from './components/HowWeWorkDesktop/HowWeWorkDesktop'
import PromoDesktop from './components/PromoDesktop/PromoDesktop'
import EventsSectionDesktop from './components/EventsSectionDesktop/EventsSectionDesktop'

const HomePageDesktop: React.FC = () => {
    const { openModal } = useModal()

    useEffect(() => {
        const hasSeenCookies = localStorage.getItem('hasSeenCookies')
        if (!hasSeenCookies) {
            const modalKey = 'cookie_desktop'
            const modalType = 'desktop'
            openModal(modalKey, modalType)
            localStorage.setItem('hasSeenCookies', 'true')
        }
    }, [])

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
                <main>
                    <HowWeWorkDesktop />
                    <ProfessionsSectionDesktop />
                    <PromoDesktop />
                    <EventsSectionDesktop />
                </main>
            </div>
            <FooterDesktop />
        </>
    )
}
export default HomePageDesktop
