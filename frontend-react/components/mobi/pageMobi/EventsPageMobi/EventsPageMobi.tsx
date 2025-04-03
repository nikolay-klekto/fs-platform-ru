'use client'

import React, { useState } from 'react'

import { content } from './data/content'
import EventsCardMobi from './components/EventsCardMobi'
import EventsPaginationMobi from './components/EventsPaginationMobi'
import EventsSelectSearchMobi from './components/EventsSelectSearchMobi'
import EventsSelectSearchDateMobi from './components/EventsSelectSearchDateMobi'
import EventsSelectSearchCityMobi from './components/EventsSelectSearchCityMobi'
import FooterMobi from '@/components/mobi/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/HeaderMobi/HeaderMobi'

const EventsPageDesktop: React.FC = () => {
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
            <div className="h-[20px] bg-[#101030]"></div>
            <HeaderMobi />
            <div className="bg-[#101030] text-white">
                <div className="3xl:p-[76px_130px_150px_130px] container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                    <h1 className="title80px_desktop relative z-[1]">Мероприятия</h1>
                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pb-[30px] pt-[116px]">
                        <EventsSelectSearchMobi />
                        <EventsSelectSearchDateMobi />
                        <EventsSelectSearchCityMobi />
                    </div>
                    <div className="3xl:gap-[25px] 4xl:gap-[30px] flex flex-wrap justify-center gap-[36px] 2xl:gap-[20px]">
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
        </>
    )
}

export default EventsPageDesktop
