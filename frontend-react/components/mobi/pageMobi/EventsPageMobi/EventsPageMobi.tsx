'use client'

import React, { useEffect, useState, useMemo } from 'react'

import { fakeEvents } from './contentEventsPageMobi/content'
import { getAllActualEvents } from '../../../../lib/api/events/events'
import EventsCardMobi from './components/EventsCardMobi'
import EventsPaginationMobi from './components/EventsPaginationMobi'
import EventsFilterModalMobi from '../../../../modals/ModalsMobi/ModalFilterEventsMobi/EventsFilterModalMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import { FiltersIconMobi } from '@/components/assets/iconsMobi'
import { isToday, isTomorrow, isThisWeek, isThisMonth, isInNext3Months } from './lib/dateHelpers'

type FiltersState = {
    categories: string[]
    dates: string[]
    cities: string[]
    dateScope: string
}

type EventType = (typeof fakeEvents)[number]
const USE_FAKE_DATA = false

const EventsPageMobi: React.FC = () => {
    const [allEvents, setAllEvents] = useState<EventType[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const [showFilter, setShowFilter] = useState(false)
    const [filters, setFilters] = useState<FiltersState>({
        categories: [],
        dates: [],
        cities: [],
        dateScope: '',
    })

    useEffect(() => {
        if (USE_FAKE_DATA) {
            setAllEvents(fakeEvents)
            setLoading(false)
            return
        }
        getAllActualEvents()
            .then((data) => setAllEvents(data && Array.isArray(data) ? data : fakeEvents))
            .catch(() => {
                setAllEvents(fakeEvents)
                setError('Ошибка загрузки событий')
            })
            .finally(() => setLoading(false))
    }, [])

    const categories = useMemo(
        () => (allEvents ? Array.from(new Set(allEvents.map((e) => e.eventCategory.category))) : []),
        [allEvents],
    )
    const cities = useMemo(() => (allEvents ? Array.from(new Set(allEvents.map((e) => e.city.name))) : []), [allEvents])
    console.log('allEvents', allEvents)

    const sortedEvents = useMemo(() => {
        if (!allEvents) return []
        return [...allEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }, [allEvents])

    const filteredEvents = useMemo(() => {
        return sortedEvents.filter((event) => {
            if (filters.categories.length > 0 && !filters.categories.includes(event.eventCategory.category))
                return false
            if (filters.cities.length > 0 && !filters.cities.includes(event.city.name)) return false
            if (filters.dates && filters.dates.length > 0) {
                let show = false
                if (filters.dates.includes('Сегодня') && isToday(event.date)) show = true
                if (filters.dates.includes('Завтра') && isTomorrow(event.date)) show = true
                if (!show) return false
            }
            if (filters.dateScope) {
                if (filters.dateScope === 'Эта неделя' && !isThisWeek(event.date)) return false
                if (filters.dateScope === 'В этом месяце' && !isThisMonth(event.date)) return false
                if (filters.dateScope === 'Ближайшие 3 месяца' && !isInNext3Months(event.date)) return false
            }
            return true
        })
    }, [sortedEvents, filters])

    const totalPages = Math.ceil(filteredEvents.length / cardsPerPage)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const hasActiveFilters = (filters: FiltersState) => {
        return (
            filters.categories.length > 0 ||
            filters.dates.length > 0 ||
            filters.cities.length > 0 ||
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

    if (loading || !allEvents) return <div className="p-8 text-center">Загрузка...</div>
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>

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
                                    filters={filters}
                                    onApply={setFilters}
                                    categories={categories}
                                    cities={cities}
                                />
                            )}
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap justify-center gap-[24px]">
                                {filteredEvents.length === 0 ? (
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
                                    filteredEvents
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
