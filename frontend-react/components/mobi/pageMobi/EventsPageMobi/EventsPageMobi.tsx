'use client'

import React, { useState } from 'react'
import { useFilteredEvents, EventsFilterConfig } from '@/hooks/useFilteredEvents'
import EventsCardMobi from './components/EventsCardMobi'
import EventsPaginationMobi from './components/EventsPaginationMobi'
import EventsFilterModalMobi from '../../../../modals/ModalsMobi/ModalFilterEventsMobi/EventsFilterModalMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import { FiltersIconMobi } from '@/components/assets/iconsMobi'

const USE_FAKE_DATA = false

const EventsPageMobi: React.FC = () => {
    const [filters, setFilters] = useState<EventsFilterConfig>({
        categories: [],
        dates: [],
        cities: [],
        dateScope: '',
    })

    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const [showFilter, setShowFilter] = useState(false)

    const { events, categories, cities, loading, error } = useFilteredEvents(filters, USE_FAKE_DATA)

    const totalPages = Math.ceil(events.length / cardsPerPage)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const hasActiveFilters = (filters: EventsFilterConfig) => {
        return (
            (filters.categories && filters.categories.length > 0) ||
            (filters.dates && filters.dates.length > 0) ||
            (filters.cities && filters.cities.length > 0) ||
            !!filters.dateScope
        )
    }

    const resetFilters = () => {
        setFilters({
            categories: [],
            dates: [],
            cities: [],
            dateScope: '',
        })
    }

    if (loading)
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101030] text-white">
                <div className="p-8 text-center">Загрузка...</div>
            </div>
        )

    if (error)
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101030] text-red-400">
                <div className="p-8 text-center">{error.message || String(error)}</div>
            </div>
        )
    return (
        <>
            <div className="flex min-h-screen flex-col bg-[#101030] text-white">
                <HeaderMobi />
                <div className="bg-[#101030] text-white">
                    <div className="relative overflow-hidden px-[16px] pt-[40px]">
                        <div className="mb-10 flex items-center justify-between pr-[4px]">
                            <h1 className="text28px_mobi relative font-medium uppercase">Мероприятия</h1>
                            <FiltersIconMobi
                                className={`size-[24px] ${hasActiveFilters(filters) ? 'text-white' : 'text-[#878797]'}`}
                                onClick={() => setShowFilter(true)}
                            />
                            {showFilter && (
                                <EventsFilterModalMobi
                                    onClose={() => setShowFilter(false)}
                                    filters={{
                                        categories: filters.categories ?? [],
                                        dates: filters.dates ?? [],
                                        cities: filters.cities ?? [],
                                        dateScope: filters.dateScope ?? '',
                                    }}
                                    onApply={setFilters}
                                    categories={categories}
                                    cities={cities}
                                />
                            )}
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap justify-center gap-[24px]">
                                {events.length === 0 ? (
                                    <div className="flex min-h-[300px] flex-col items-center gap-10">
                                        <div className="text-center text-[14px] font-medium text-[#878797] md:text-[16px]">
                                            Нет мероприятий по выбранным фильтрам
                                        </div>
                                        <button
                                            onClick={resetFilters}
                                            className="w-[188px] rounded-full border-2 border-[#3d50ad] bg-transparent py-2 text-[15px] font-medium text-white transition-all duration-200 active:opacity-80"
                                        >
                                            Вернуться назад
                                        </button>
                                    </div>
                                ) : (
                                    events
                                        .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                        .map((item) => (
                                            <EventsCardMobi
                                                key={item.id}
                                                title={item.name}
                                                category={item.eventCategory.category}
                                                image={`/api/events/image?eventId=${item.id}`}
                                                date={item.date}
                                                time={item.time}
                                                city={item.city.name}
                                                place={item.publicPlaceName}
                                                company={item.organizer}
                                            />
                                        ))
                                )}
                            </div>
                        </div>
                        {totalPages > 1 ? (
                            <EventsPaginationMobi
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        ) : (
                            <div className="h-[30px]" />
                        )}
                    </div>
                </div>
                <FooterMobi />
            </div>
        </>
    )
}

export default EventsPageMobi
