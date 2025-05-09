'use client'

import React, { useState } from 'react'

import { content } from './contentEventsPageMobi/content'
import EventsCardMobi from './components/EventsCardMobi'
import EventsPaginationMobi from './components/EventsPaginationMobi'
// import EventsSelectSearchMobi from './components/EventsSelectSearchMobi'
// import EventsSelectSearchDateMobi from './components/EventsSelectSearchDateMobi'
// import EventsSelectSearchCityMobi from './components/EventsSelectSearchCityMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import { FiltersIconMobi } from '@/components/assets/iconsMobi'

const EventsPageMobi: React.FC = () => {
    //const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const totalPages = Math.ceil(content.length / cardsPerPage)

    // const handleSearch = () => {
    //console.log('Поиск мероприятия:', searchQuery)
    //setSearchQuery('')
    //}
    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="flex min-h-screen flex-col bg-[#101030] text-white">
                <HeaderMobi />
                <div className="bg-[#101030] text-white">
                    <div className="relative overflow-hidden px-[16px] pt-[40px]">
                        <div className="mb-10 flex items-center justify-between pr-[4px]">
                            <h1 className="text28px_mobi relative uppercase">Мероприятия</h1>
                            <FiltersIconMobi className={`size-[24px] text-white`} />
                        </div>

                        {/* <div className="relative z-[1] flex items-center justify-end gap-[30px] pt-[24px] pb-[24px]">
                            <EventsSelectSearchMobi />
                            <EventsSelectSearchDateMobi />
                            <EventsSelectSearchCityMobi />
                        </div> */}
                        <div className="flex flex-col items-center gap-[24px]">
                            {content.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((item) => (
                                <EventsCardMobi
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
                        <EventsPaginationMobi
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
                <FooterMobi />
            </div>
        </>
    )
}

export default EventsPageMobi
