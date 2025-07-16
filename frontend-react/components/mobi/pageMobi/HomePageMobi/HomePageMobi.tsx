import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useModal } from '@/context/ContextModal'
import HeaderMainMobi from './components/HeaderMainMobi/HeaderMainMobi'
import HeaderCardsMobi from './components/HeaderCardsMobi/HeaderCardsMobi'
import ProfessionsSectionMobi from './components/ProfessionsSectionMobi/ProfessionsSectionMobi'
import HowWeWorkMobi from './components/HowWeWorkMobi/HowWeWorkMobi'
import PromoMobi from './components/PromoMobi/PromoMobi'
import EventsSectionMobi from './components/EventsSectionMobi/EventsSectionMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'

const HomePageMobi: React.FC = () => {
    const [isClient, setIsClient] = useState(false)
    const { openModal } = useModal()
    const isDesktop = useMediaQuery({
        query: '(min-width: 1240px)',
    })

    useEffect(() => {
        setIsClient(true)

        const hasSeenCookies = localStorage.getItem('hasSeenCookies')
        if (!hasSeenCookies) {
            const modalKey = isDesktop ? 'cookie_desktop' : 'cookie_mobi'
            const modalType = isDesktop ? 'desktop' : 'mobi'
            openModal(modalKey, modalType)
            localStorage.setItem('hasSeenCookies', 'true')
        }
    }, [openModal, isDesktop])

    if (!isClient) {
        return null
    }

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
