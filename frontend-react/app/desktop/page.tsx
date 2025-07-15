'use client'
import { useEffect } from 'react'
import HomePageDesktop from '@/components/desktop/pageDesktop/HomePageDesktop/HomePageDesktop'
import { useModal } from '@/context/ContextModal'

export default function Home() {
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

    return <HomePageDesktop />
}
