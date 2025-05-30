'use client'

import React, { useState } from 'react'

import { content } from './contentEventsPageDesktop/content'
import EventsCardDesktop from './components/EventsCardDesktop'
import EventsPaginationDesktop from './components/EventsPaginationDesktop'
import EventsSelectSearchDesktop from './components/EventsSelectSearchDesktop'
import EventsSelectSearchDateDesktop from './components/EventsSelectSearchDateDesctop'
import EventsSelectSearchCityDesktop from './components/EventsSelectSearchCityDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import { useEffect } from 'react'

const EventsPageDesktop: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredContent, setFilteredContent] = useState(content)
    const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({
        from: null,
        to: null,
    })
    filteredContent.forEach((item) => console.log(item))

    useEffect(() => {
        const parseDate = (dateStr: string): Date => {
            const [day, month, year] = dateStr.split('.').map(Number)
            return new Date(year, month - 1, day)
        }

        const filtered = content.filter((item) => {
            const itemDate = parseDate(item.date)
            const from = dates.from
            const to = dates.to

            if (from && to) return itemDate >= from && itemDate <= to
            if (from) return itemDate >= from
            if (to) return itemDate <= to
            return true
        })

        setFilteredContent(filtered)
    }, [dates])

    const cardsPerPage = 6
    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const paginatedCards = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    return (
        <>
            <HeaderDesktop />
            <div className="bg-[#101030] text-white">
                <div className="min-h-screen 3xl:p-[76px_130px_150px_130px] container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                    <h1 className="title80px_desktop relative z-[1]">Мероприятия</h1>
                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pb-[30px] pt-[116px]">
                        <EventsSelectSearchDesktop />
                        <EventsSelectSearchDateDesktop dates={dates} setDates={setDates} />
                        <EventsSelectSearchCityDesktop />
                    </div>
                    <div className="min-h-[100vh] 3xl:gap-[25px] 4xl:gap-[30px] flex flex-wrap justify-center gap-[36px] 2xl:gap-[20px]">
                        {paginatedCards.map((item) => (
                            <EventsCardDesktop
                                key={item.id}
                                title={item.title}
                                category={item.category}
                                image={item.image}
                                date={item.date}
                                time={item.time}
                                week={item.week}
                                city={item.city}
                                place={item.place}
                                company={item.company}
                            />
                        ))}
                    </div>
                    <EventsPaginationDesktop
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <FooterDesktop />
        </>
    )
}

export default EventsPageDesktop
