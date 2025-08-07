'use client'

import React, { useState, useEffect } from 'react'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import EventsCardDesktop from './components/EventsCardDesktop'
import PaginationDesktop from '../../shared/PaginationDesktop'
import EventsSelectSearchDesktop from './components/EventsSelectSearchDesktop'
import EventsSelectSearchDateDesktop from './components/EventsSelectSearchDateDesktop'
import EventsSelectSearchCityDesktop from './components/EventsSelectSearchCityDesktop'
import { content } from './contentEventsPageDesktop/content'

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.').map(Number)
    return new Date(year, month - 1, day)
}

const cardsPerPage = 6

const EventsPageDesktop: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredContent, setFilteredContent] = useState(content)
    const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })

    useEffect(() => {
        const { from, to } = dates
        const filtered = content.filter((item) => {
            const itemDate = parseDate(item.date)
            if (from && to) return itemDate >= from && itemDate <= to
            if (from) return itemDate >= from
            if (to) return itemDate <= to
            return true
        })

        setFilteredContent(filtered)
        setCurrentPage(1)
    }, [dates])

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const paginatedItems = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <div className="container relative min-h-screen overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px] 3xl:p-[76px_130px_150px_130px]">
                    <h1 className="title80px_desktop relative z-[1]">Мероприятия</h1>
                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pb-[30px] pt-[116px]">
                        <EventsSelectSearchDesktop />
                        <EventsSelectSearchDateDesktop dates={dates} setDates={setDates} />
                        <EventsSelectSearchCityDesktop />
                    </div>
                    <div className="flex min-h-[40vh] flex-wrap justify-center gap-[36px] 2xl:gap-[20px] 3xl:gap-[25px] 4xl:gap-[30px]">
                        {filteredContent.length > 0 ? (
                            paginatedItems.map((item) => (
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
                            ))
                        ) : (
                            <div>
                                <p className="pt-10 text-4xl opacity-20">Нет мероприятий по данным категориям</p>
                            </div>
                        )}
                    </div>
                    {totalPages > 1 && filteredContent.length > 0 && (
                        <PaginationDesktop
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default EventsPageDesktop
