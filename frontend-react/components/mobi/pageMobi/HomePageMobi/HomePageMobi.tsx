'use client'

import React, { useEffect } from 'react'
import { useModal } from '@/context/ContextModal'
import HeaderMainMobi from './components/HeaderMainMobi/HeaderMainMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderCardsMobi from './components/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'

const HomePageMobi: React.FC = () => {
    const { openModal } = useModal()

    useEffect(() => {
        const hasSeenCookies = localStorage.getItem('hasSeenCookies')
        if (!hasSeenCookies) {
            const modalKey = 'cookie_mobi'
            const modalType = 'mobi'
            openModal(modalKey, modalType)
            localStorage.setItem('hasSeenCookies', 'true')
        }
    }, [])

    return (
        <>
            <div className="bg-[#101030]">
                <HeaderMainMobi />
                <HeaderCardsMobi />
                <HowWeWorkMobi />
                <ProfessionsSectionMobi />
                <PromoMobi />
                <EventsSectionMobi />
            </div>
            <FooterMobi />
        </>
    )
}

export default HomePageMobi
