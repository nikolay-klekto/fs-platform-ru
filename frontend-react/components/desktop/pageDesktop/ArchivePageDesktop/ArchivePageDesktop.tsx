'use client'

import React, { useState, useCallback } from 'react'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import { AccountNavigationDesktop } from '@/components/desktop/layout/AccountNavigationDesktop/AccountNavigationDesktop'
import ItemCardArchiveDesktop from '@/components/desktop/pageDesktop/ArchivePageDesktop/components/ItemCardArchiveDesktop'
import { content } from '@/components/desktop/pageDesktop/ArchivePageDesktop/contentArchivePageDesktop/content'

const getInitialRatings = () => {
    const ratingsMap: Record<number, number> = {}
    content.forEach((card) => {
        ratingsMap[card.id] = card.rating
    })
    return ratingsMap
}

const ArchivePageDesktop: React.FC = () => {
    const [ratings, setRatings] = useState<Record<number, number>>(getInitialRatings)

    const handleRatingChange = useCallback((id: number, newRating: number) => {
        setRatings((prev) => ({ ...prev, [id]: newRating }))
    }, [])

    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <div className="container relative overflow-hidden px-[60px] py-[80px]">
                    <div className="radial-gradient_desktop left-[150px] top-[-330px]" aria-hidden />
                    <div className="radial-gradient_desktop right-[150px] top-[933px]" aria-hidden />

                    <div className="relative">
                        <div className="flex items-center justify-between pb-20">
                            <h1 className="title46px_desktop whitespace-nowrap pr-16 font-medium uppercase leading-[70%] tracking-normal">
                                Личный кабинет
                            </h1>
                            <AccountNavigationDesktop />
                        </div>
                        <div className="grid gap-8 grid-cols-4">
                            {content.map((card) => (
                                <ItemCardArchiveDesktop
                                    key={card.id}
                                    {...card}
                                    rating={ratings[card.id] ?? card.rating}
                                    onRatingChange={(newRating) => handleRatingChange(card.id, newRating)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default ArchivePageDesktop
