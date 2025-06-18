'use client'

import React, { useState } from 'react'

import { content } from './contentEventsPageMobi/content'
import EventsCardMobi from './components/EventsCardMobi'
import EventsPaginationMobi from './components/EventsPaginationMobi'
import EventsFilterModalMobi from '../../../../modals/ModalsMobi/ModalFilterEventsMobi/EventsFilterModalMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import { FiltersIconMobi } from '@/components/assets/iconsMobi'

const EventsPageMobi: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const [showFilter, setShowFilter] = useState(false)
    const [filters, setFilters] = useState<{
        categories: string[]
        dates: string[]
        cities: string[]
    }>({
        categories: [],
        dates: [],
        cities: [],
    })

    const filteredEvents = content.filter(
        (event) =>
            (filters.categories.length === 0 || filters.categories.includes(event.category)) &&
            (filters.dates.length === 0 || filters.dates.includes(event.date)) &&
            (filters.cities.length === 0 || filters.cities.includes(event.city)),
    )

    const totalPages = Math.ceil(filteredEvents.length / cardsPerPage)

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
                            <FiltersIconMobi className={`size-[24px] text-white`} onClick={() => setShowFilter(true)} />
                            {/* {showFilter && <EventsFilterModalMobi onClose={() => setShowFilter(false)} />} */}
                            {showFilter && (
                                <EventsFilterModalMobi
                                    onClose={() => setShowFilter(false)}
                                    filters={filters}
                                    onApply={setFilters}
                                />
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-[24px]">
                            <div className="flex min-h-[300px] flex-col items-center justify-center gap-[24px]">
                                {filteredEvents.length === 0 ? (
                                    <div className="py-12 text-center text-[16px] text-[#878797]">
                                        Нет мероприятий по выбранным фильтрам
                                    </div>
                                ) : (
                                    filteredEvents
                                        .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                        .map((item) => (
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
                                        ))
                                )}
                            </div>
                        </div>
                        {filteredEvents.length > 0 && (
                            <EventsPaginationMobi
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
                <FooterMobi />
            </div>
        </>
    )
}

export default EventsPageMobi
