'use client'

import React, { useState, useCallback } from 'react'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import { AccountNavigationDesktop } from '@/components/desktop/layout/AccountNavigationDesktop/AccountNavigationDesktop'
import ItemCardArchiveDesktop from '@/components/desktop/pageDesktop/ArchivePageDesktop/components/ItemCardArchiveDesktop'
import { content as initialContent } from '@/components/desktop/pageDesktop/ArchivePageDesktop/contentArchivePageDesktop/content'

const ArchivePageDesktop: React.FC = () => {
    const [cards, setCards] = useState(initialContent)

    const handleRatingChange = useCallback((id: number, newRating: number) => {
        setCards((prev) => prev.map((card) => (card.id === id ? { ...card, rating: newRating } : card)))
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-[#101030] text-white">
            <HeaderDesktop />
            <main className="flex-1 bg-[#101030] text-white">
                <div className="container relative overflow-hidden p-[76px_60px_88px_60px]">
                    <div className="radial-gradient_desktop left-[150px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between py-20">
                            <h1 className="title46px_desktop whitespace-nowrap pr-16 font-medium uppercase leading-[70%] tracking-normal">
                                Личный кабинет
                            </h1>
                            <AccountNavigationDesktop />
                        </div>
                        <div className="grid gap-8 grid-cols-4">
                            {cards.map((card) => (
                                <ItemCardArchiveDesktop
                                    key={card.id}
                                    {...card}
                                    onRatingChange={(newRating) => handleRatingChange(card.id, newRating)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <FooterDesktop />
        </div>
    )
}

export default ArchivePageDesktop
