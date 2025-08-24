'use client'

import React, { useState, useCallback } from 'react'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import { AccountNavigationMobi } from '../../layout/AccountNavigationMobi/AccountNavigationMobi'
import ItemCardArchiveMobi from '@/components/mobi/pageMobi/ArchivePageMobi/components/ItemCardArchiveMobi/ItemCardArchiveMobi'
import { content } from '@/components/mobi/pageMobi/ArchivePageMobi/contentArchivePageMobi/content'

const getInitialRatings = () => {
    const ratingsMap: Record<number, number> = {}
    content.forEach((card) => {
        ratingsMap[card.id] = card.rating
    })
    return ratingsMap
}

const ArchivePageMobi: React.FC = () => {

    const [ratings, setRatings] = useState<Record<number, number>>(getInitialRatings)

    const handleRatingChange = useCallback((id: number, newRating: number) => {
        setRatings((prev) => ({ ...prev, [id]: newRating }))
    }, [])

    return (
        <>
            <HeaderMobi />
            <main className="grow bg-[#101030] pb-[40px]">
                <div className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px]">
                    <h1 className="title28px_mobi_custom mb-4 uppercase">Личный кабинет</h1>
                    <AccountNavigationMobi />
                </div>
                <div className="grid gap-[9px] grid-cols-2 mx-[15px] mt-[24px]">
                    {content.map((card) => (
                        <ItemCardArchiveMobi
                            key={card.id}
                            {...card}
                            rating={ratings[card.id] ?? card.rating}
                            onRatingChange={(newRating) => handleRatingChange(card.id, newRating)}
                        />
                    ))}
                </div>
            </main>
            <FooterMobi />
        </>
    )
}

export default ArchivePageMobi